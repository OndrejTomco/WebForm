$(function(){
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = parseInt(date.getMonth()+1);
    var currentDay = date.getDate();
    var error = false;

    $(submitBtn).click(function(){
        var firstName = $(fname).val();
        var lastName = $(lname).val();

        //testing if ame inputs are valid
        if(firstName.trim().length<2){
            $(warningfn).css("display", "block");
            error = true;
            
        }
        else{
            $(warningfn).css("display", "none");
            errpr = false;
        }

        if(lastName.trim().length<2){
            $(warningln).css("display", "block");
            error = true;
            
        }
        else{
            $(warningln).css("display", "none");
            error = false;
        }

        // testing if date is valid
        var splitDate = $(bdate).val().split('-');

        if(splitDate[0]>currentYear){
            $(warningbd).css("display", "block");
            error = true;
        }
        else if(splitDate[0]==currentYear){
             if(splitDate[1]>currentMonth){
                $(warningbd).css("display", "block");
                error = true;
             }
            
             else if(splitDate[1]==currentMonth){
                 if(splitDate[2]>currentDay){
                    $(warningbd).css("display", "block");
                    error = true;
                 }
                 else{
                    $(warningbd).css("display", "none");
                    error = false;
                 }
             }
             else{
                $(warningbd).css("display", "none");
                error = false;
             }
         }
         else{
            $(warningbd).css("display", "none");
            error = false;
         }

         //if date is set
         if(isNaN ( splitDate[0] || splitDate[1] ||splitDate[2] )) {
            $(warningbd).css("display", "block");
            error = true;
        }

        console.log(error);
        if(error == false){
            printTable();
        }
        
    })

    function printTable(){
        var tableDiv = $(dynamicTable);
        var table = $("<table/>");
        var line = $("<tr/>");
        var thead = $("<thead/>");
        
        $(tableDiv).addClass('mt-4 container');
        $(table).addClass('table table-stripped  row align-items-center justify-content-center ');
        $(thead).addClass('thead-light');
        
        tableDiv.append(table);
        table.append(line);
        line.append(thead);

        var headCol1 = $("<th/>");
        thead.append(headCol1);
        $(headCol1).append('First Name');

        var headCol2 = $("<th/>");
        thead.append(headCol2);
        $(headCol2).append('Last Name');

        var headCol3 = $("<th/>");
        thead.append(headCol3);
        $(headCol3).append('Birth date');
        
        var headCol4 = $("<th/>");
        thead.append(headCol4);
        $(headCol4).append('Gender');

        var headCol5 = $("<th/>");
        thead.append(headCol5);
        $(headCol5).append('Delete');
        
    
        }

});