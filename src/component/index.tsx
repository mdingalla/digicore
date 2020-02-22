import React from 'react';
import './index.css';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


interface IState  {
    name:string;
    position:string
    backgroundImage:any;
}



class MainApp extends React.Component<any,IState>{
    constructor(props:any){
        super(props);
        
        this.state = {
            name:'',
            position:'',
            backgroundImage:null
        }
    }

    handleBackgroundChange(e:any) {
        const fileReader = new FileReader();
        const file = e.target.files[0];
        let image = new Image();
        image.onload = ()=>{
            var canvas = document.createElement('canvas'),
            max_size = 165,// TODO : pull max size from a site config
            width = image.width,
            height = image.height;

                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }
            
                if(canvas)
                {
                    canvas.width = max_size;
                    canvas.height = max_size;
                 
                   var ctx =  canvas.getContext('2d');
                  if(ctx)
                  {
                    ctx.drawImage(image, 0, 0, max_size, max_size);
                     var dataUrl = canvas.toDataURL('image/jpeg');
                     this.setState({
                        backgroundImage: dataUrl
                      });

                  }
                   
                    // var resizedImage = dataURLToBlob(dataUrl);
                   
                }
          }
       

        fileReader.onload = () => {
            // this.background.style.backgroundImage = `url(${fileReader.result})`;
            // console.log(fileReader.result)
              if(fileReader.result)
              {
                image.src = fileReader.result as string
              }


          
          };
          fileReader.readAsDataURL(file);
         
         

        
    }

    printPDF(){
        const front = document.getElementById('frontCard');
        
       if(front)
       {
        html2canvas(front)
        .then((canvas:any) => {
                var img_w = canvas.width + 50;
                var img_h = canvas.height;
                const pdf  = new jsPDF();
           
            const frontData = canvas.toDataURL('image/png');
            pdf.addImage(frontData, 'PNG', 0, 0);
            const hratio = img_h / img_w;


            const back = document.getElementById('backCard');
            if(back)
            {
                html2canvas(back)
                    .then((canvass2:any)=> {

                        const backData = canvass2.toDataURL('image/png');

                        // var width = pdf.internal.pageSize.getWidth() - 50;
                        // var height = width * hratio;
            
                        // // pdf.addImage(imgData, 'JPEG', 20,20,width,height);
                        pdf.addPage();
                        pdf.addImage(backData, 'PNG', 0, 0);
                        pdf.save(`${this.state.name || "DigiCoreTech"}.pdf`);  

                    })
            }
           
        })
       }
    }


    // printPDF(){
       
        
    //     const back = document.getElementById('AllCard');
    //         if(back)
    //         {
    //             html2canvas(back)
    //                 .then((canvass2:any)=> {

    //                     const backData = canvass2.toDataURL('image/png',100,100);
    //                     const pdf  = new jsPDF('l')
    //                     // var width = pdf.internal.pageSize.getWidth() - 50;
    //                     // var height = width * hratio;
            
    //                     // // pdf.addImage(imgData, 'JPEG', 20,20,width,height);
    //                     // pdf.addPage();
    //                     pdf.addImage(backData, 'PNG', 0, 0);
    //                     pdf.save(`${this.state.name}.pdf`);  

    //                 })
    //         }
    // }

    render(){

       

        return <div>


        <div id="AllCard">
            <div id="frontCard" className="employeeCard employeeFront">
                <div 
                style={
                    {
                        backgroundImage: `url(${this.state.backgroundImage})`,
                        backgroundRepeat:"no-repeat",
                    }
                }
                className="employeePhoto"></div>
                <div className="employeeName">
                        <label>{this.state.name}</label>
                    </div>
                    <div className="employeePosition">
                        <label>{this.state.position}</label>
                    </div>
            </div>

            <div id="backCard"  className="employeeCard employeeBack">
                <div className="employeeData">
                    <div className="employeeDataRow">
                        <label>SSS No</label>
                    </div>

                    <div className="employeeDataRow">
                        <label>TIN No</label>
                    </div>

                    <div className="employeeDataRow">
                        <label>IN CASE OF EMERGENCY, PLEASE NOTIFY</label>
                    </div>
                    
                    <div className="employeeDataRow">
                        <label>TEL No.</label>
                    </div>

                    <div className="employeeDataRow">
                        <label>Address.</label>
                    </div>

                </div>


                <div className="back-footer">
                    <p>This ID Card is the property of DigiCORETech Inc. and must be surrendered upon demand.</p>
                </div>

            </div>

        </div>

            <div className="employeeCard">

                <div>
                    <label className="">
                        Name:
                    </label>
                    <input type="text" onChange={e=> this.setState({
                        name:e.currentTarget.value
                    })}/>
                </div>

                <div>
                <label className="">
                        Position:
                    </label>
                    <input type="text" onChange={e=> this.setState({
                        position:e.currentTarget.value
                    })}/>
                </div>

                <div>
                    <input onChange={this.handleBackgroundChange.bind(this)} type="file" accept="image/*" />
                </div>

                <div>
                    <button 
                    onClick={this.printPDF.bind(this)}
                    type="button">Print</button>
                </div>


                <img id="myImage" />
            </div>

        </div>
    }
}

export default MainApp;