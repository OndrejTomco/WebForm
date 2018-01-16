$(function(){
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = parseInt(date.getMonth()+1);
    var currentDay = date.getDate();
    var error = false;
    var personArray = [];

    $(submitBtn).click(function(){
        var firstName = $(fname).val();
        var lastName = $(lname).val();

        //testing if inputs are valid
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
        //creating person object
        var person = {
            firstName : $(fname).val(),
            lastName : $(lname).val(),
            bdate : $(bdate).val(),
            gender: getGender(),
        };


        personArray.push(person);
        console.log(personArray.length);

        var tableDiv = $(dynamicTable);
        var table = $("<table/>");
        var line = $("<tr/>");
        var thead = $("<thead/>");
        var col = $("<td/>");
        var tbody = $("<tbody/>");
        var header = '<th>First Name</th><th>Last Name</th><th>Birth Date</th><th>Gender</th><th>Delete</th>';
        
        //removing previous table
        document.getElementById('dynamicTable').innerHTML = "";

        $(tableDiv).addClass('mt-4 container');
        $(tableDiv).append(table);
        $(table).addClass('table table-stripped  row align-items-center justify-content-center ');
        $(table).append(thead);
        $(thead).addClass('thead-inverse');
        $(thead).append(header);
        $(thead).append(tbody);
        
        //adding users to table
        for(i=0;i<personArray.length;i++){
            $(tbody).append('<tr><td>'+personArray[i].firstName+'</td><td>'+personArray[i].lastName+'</td><td>'+personArray[i].bdate+'</td> <td>'+personArray[i].gender+'</td><tr>');
        }
    
        }

        function getGender(){
            var maleBox = document.getElementById('maleBox');
            if(maleBox.checked){
                return 'male';
            }
            else{
                return 'female';
            }
        }

});