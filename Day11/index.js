var XLSX = require('xlsx');


function readExcelFIle(path) {
    try {
        var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    let data = xlData.map(item=>{
        if (item.AnnualSalary <= 50000) {
            BonusPercentage = 0.05;
            BonusAmount = item.AnnualSalary * BonusPercentage;
        } else if (item.AnnualSalary >= 50000 && item.AnnualSalary < 100000) {
            BonusPercentage = 0.07;
            BonusAmount = item.AnnualSalary * BonusPercentage;
        } else if (item.AnnualSalary > 100000) {
            BonusPercentage = 0.1;
            BonusAmount = item.AnnualSalary * BonusPercentage;
        }
        return {...item,BonusPercentage,BonusAmount}
    })
    console.log(data);

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Write to file
    XLSX.writeFile(wb, 'output.xlsx');

    } catch (error) {
        console.log(error.message);
    }
    
}

readExcelFIle('employee_data_.xlsx');

