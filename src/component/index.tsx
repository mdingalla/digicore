import React from 'react';
import './index.css';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


interface IState  {
    name:string;
    position:string
    backgroundImage:any;
    sss:string;
    tin:string;
    contact:string;
    telno:string;
    address:string;
}



class MainApp extends React.Component<any,IState>{
    constructor(props:any){
        super(props);
        
        this.state = {
            name:'',
            position:'',
            address:'',
            contact:'',
            sss:'',
            telno:'',
            tin:'',
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

       

        return <div className="container-fluid">
             <div className="row">
                <div className="col-sm">
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
                </div>
                
                <div className="col-sm">
                    <div id="backCard"  className="employeeCard employeeBack">
                        <div className="employeeData">
                            <div className="employeeDataRow">
                                <label>SSS No :</label>
                                <span>{this.state.sss}</span>
                            </div>

                            <div className="employeeDataRow">
                                <label>TIN No :</label>
                                <span>{this.state.tin}</span>
                            </div>

                            <div className="employeeDataRow employeeContact">
                                <label>IN CASE OF EMERGENCY, PLEASE NOTIFY: </label>
                                <span>{this.state.contact}</span>
                            </div>
                            
                            <div className="employeeDataRow">
                                <label>TEL No :</label>
                                <span>{this.state.telno}</span>
                            </div>

                            <div className="employeeDataRow overflow-hidden">
                                <label>Address :</label>
                                <span>{this.state.address}</span>
                            </div>

                        </div>


                        <div className="back-footer">
                            <p>This ID Card is the property of DigiCORETech Inc. and must be surrendered upon demand.</p>
                        </div>

                    </div>
                </div>
                
                <div className="col-sm">
                    <form>
                    <div className="employeeCard">

                    <div className="form-group">
                        <label className="">
                            Name:
                        </label>
                        <input className="form-control" type="text" onChange={e=> this.setState({
                            name:e.currentTarget.value
                        })}/>
                    </div>

                    <div className="form-group">
                    <label className="">
                            Position:
                        </label>
                        <input type="text" className="form-control"  onChange={e=> this.setState({
                            position:e.currentTarget.value
                        })}/>
                    </div>

                    <div className="form-group">
                    <label className="">
                            SSS:
                        </label>
                        <input type="text" className="form-control"  onChange={e=> this.setState({
                            sss:e.currentTarget.value
                        })}/>
                    </div>

                    <div className="form-group">
                    <label className="">
                            TIN:
                        </label>
                        <input type="text" className="form-control"  onChange={e=> this.setState({
                            tin:e.currentTarget.value
                        })}/>
                    </div>

                    <div className="form-group">
                    <label className="">
                            Contact:
                        </label>
                        <input type="text" className="form-control"  onChange={e=> this.setState({
                            contact:e.currentTarget.value
                        })}/>
                    </div>

                    <div className="form-group">
                    <label className="">
                            Tel No:
                        </label>
                        <input type="text" className="form-control"  onChange={e=> this.setState({
                            telno:e.currentTarget.value
                        })}/>
                    </div>

                    <div className="form-group">
                    <label className="">
                            Address:
                        </label>
                        <textarea className="form-control"  onChange={e=> this.setState({
                            address:e.currentTarget.value
                        })}/>
                      
                    </div>

                    <div className="form-group">
                        <input onChange={this.handleBackgroundChange.bind(this)} type="file" accept="image/*" />
                    </div>

                    <div className="form-group">
                        <button 
                        onClick={this.printPDF.bind(this)}
                        type="button">Print</button>
                    </div>


                        {/* <img id="myImage" /> */}
                    </div>
                    </form>
                </div>

            </div>
        </div>
    }
}

export default MainApp;