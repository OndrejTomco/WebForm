
$(function(){
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = parseInt(date.getMonth()+1);
    var currentDay = date.getDate();
    var error = false;
    var personArray = [];
    var maleArray = [];
    var femaleArray = [];
    

    $(submitBtn).click(verifyInput);
    $("#sel1").change(printTable);
    $("#ageBox").click(printTable);
    
    function verifyInput(){

        var firstName = $(fname).val();
        var lastName = $(lname).val();

        //testing if name inputs are valid
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
        console.log(splitDate);

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

        if(error == false){
            createPerson();
        }
        
    }

    function createPerson(){
        var person = {
            firstName : $(fname).val(),
            lastName : $(lname).val(),
            bdate : $(bdate).val(),
            gender: getGender(),
            age: calculateAge()
        };

        personArray.push(person);

        if(person.gender == 'Male'){
            maleArray.push(person);
        }
        else if(person.gender == 'Female'){
            femaleArray.push(person);
        }

        printTable();
        

    }

    function getGender(){
        var maleBox = document.getElementById('maleBox');
        if(maleBox.checked){
            return 'Male';
        }
        else{
            return 'Female';
        }
    }

    function printTable(){

        var birthOrAge = [];
        
        if(personArray.length == 0){
            $(".dynamicTable").css("display","none");
            return 0;
        }

        $("tbody").empty();
        $(".dynamicTable").css("display","block");

        if ($('#ageBox').is(':checked')){
            $("#bdateHead").html('Age');
            if($("#sel1").val()==2){
                for(i=0;i<maleArray.length;i++){
                    birthOrAge[i] = maleArray[i].age;
                }
            }

            if($("#sel1").val()==3){
                for(i=0;i<femaleArray.length;i++){
                    birthOrAge[i] = femaleArray[i].age;
                }
            }
            else{
                for(i=0;i<personArray.length;i++){
                    birthOrAge[i] = personArray[i].age;
                }
            }
            
        }

        else{   
            $("#bdateHead").html('Birth Date');
            if($("#sel1").val()==2){
                for(i=0;i<maleArray.length;i++){
                    birthOrAge[i] = maleArray[i].bdate;
                }
            }

            if($("#sel1").val()==3){
                for(i=0;i<femaleArray.length;i++){
                    birthOrAge[i] = femaleArray[i].bdate;
                }
            }
            else{
                for(i=0;i<personArray.length;i++){
                    birthOrAge[i] = personArray[i].bdate;
                }
            }
        }
        

        if($("#sel1").val()==1){
            for(i=0;i<personArray.length;i++){
                $("tbody").append('<tr><td>'+personArray[i].firstName+'</td><td>'+personArray[i].lastName+'</td><td>'+birthOrAge[i]+'</td> <td>'+personArray[i].gender+'</td><td>Delete</td><tr>');
            }
        }

        else if($("#sel1").val()==2){
            if(maleArray.length == 0){
                $(".dynamicTable").css("display","none");
            }
            for(i=0;i<maleArray.length;i++){
                $("tbody").append('<tr><td>'+maleArray[i].firstName+'</td><td>'+maleArray[i].lastName+'</td><td>'+birthOrAge[i]+'</td> <td>'+maleArray[i].gender+'</td><td>Delete</td><tr>');
            }
        }

        else{
            if(femaleArray.length == 0){
                $(".dynamicTable").css("display","none");
            }
            for(i=0;i<femaleArray.length;i++){
                $("tbody").append('<tr><td>'+femaleArray[i].firstName+'</td><td>'+femaleArray[i].lastName+'</td><td>'+birthOrAge[i]+'</td> <td>'+femaleArray[i].gender+'</td><td>Delete</td><tr>');
            }

        }

    }

    function calculateAge(){

            splitDate = $(bdate).val().split('-');
            console.log(splitDate);
            var age = currentYear - splitDate[0];
            console.log(currentYear,splitDate[0]);

            if(currentMonth==splitDate[1]) {
                if(currentDay>=splitDate[2]) {
                    return age
                }
                else {
                    return age-1;
                }
            }
        
            else if(currentMonth > splitDate[1]) {
                return age;
            }
                
            else if(currentMonth<splitDate[1]) {
                return age-1;
            }
            
    }

});

    
