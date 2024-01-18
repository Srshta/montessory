import React, { useState } from "react";
import { Button} from "@material-ui/core";
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
// import {Tooltip} from "@material-ui";



const ExportExcel=({ excelData, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension= '.xlsx';
    const exportToExcel= async()=>{
        const ws=XLSX.utils.json_to_sheet(excelData);
       // const wb={Sheet:{'data':ws}, SheetNames:['data']};

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, fileName+'.xlsx');
        // const excelBuffer= XLSX.write(wb,{bookType:'xlsx', type:'array'});
        // const data= new Blob([excelBuffer],{type:fileType});
        // FileSaver.saveAs(data, fileName + fileExtension);
    }
    return(
        <>
        
            <Button variant="contained"  color="primary"  onClick={(e)=>exportToExcel(fileName)} 
            
             style={{cursor:"pointer", fontSize:13, backgroundColor:'#30875b'}}>
                Excel Export</Button>
       
        </>
    )
}
export default ExportExcel;