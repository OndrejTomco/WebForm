
$(function(){
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = parseInt(date.getMonth()+1);
    var currentDay = date.getDate();
    var error = false;
    var personArray = [];
    
    $(submitBtn).click(verifyInput);
    $("#sel1").change(printTable);
    $("#ageBox").click(printTable);

    $("#submitBtn").click(function() {
        $('html,body').animate({
            scrollTop: $(".dynamicTable").offset().top},
            'normal');
    });
    
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
            gender: getPersonGender(),
            age: calculateAge(),
            id: personArray.length +1
        };

        personArray.push(person);

        printTable();
    
    }

    function getPersonGender(){
        var maleBox = document.getElementById('maleBox');
        if(maleBox.checked){
            return 'Male';
        }
        else{
            return 'Female';
        }
    }

    function getSelectedGender(){
        var selectedGender = $("#sel1").val();
        return selectedGender;
     }

    function printTable(){

        var personCopy = new Array();
        var selectedGender = getSelectedGender();

        personArray.forEach(function(obj){

            if(selectedGender == 'M' && obj.gender=='Male'){
                 personCopy.push(obj);
            }
            if(selectedGender == 'F' && obj.gender=='Female'){
                 personCopy.push(obj);
            }
            if(selectedGender == 'B'){            
                 personCopy.push(obj);
            }
          });

        if(personCopy.length == 0){
            $(".dynamicTable").css("display","none");
            return 0;
        }

        $("tbody").empty();
        $(".dynamicTable").fadeIn("normal");

        personCopy.forEach(function(obj){
            var dateOrAge;
            
            if ($('#ageBox').is(':checked')){
                dateOrAge = obj.age;
                $('#bdateHead').html('Age');
            }
            else{
                dateOrAge = obj.bdate;
                $('#bdateHead').html('Birth date');
            }
            $('#myTable > tbody').append('<tr id="'+obj.id+'"><td>'+ obj.firstName+'</td><td>'+ obj.lastName+'</td><td>'+dateOrAge+'</td><td>'+ obj.gender+'</td><td class="delete"><button class="btn btn-danger btn-sm">Remove</button></td></tr>');
            console.log(obj);
        });

        
         $(".delete").click(function(){
            var row = this.parentNode;
            row.remove();
            
            for(i=0;i<personArray.length;i++){
                if(row.id == personArray[i].id){
                    personArray.splice(i,1);
                }
            }
            
            if(personArray.length == 0){
                $(".dynamicTable").fadeOut('normal');
            }
                
         });

         $('.containerForm :input').val('');

        }

    function calculateAge(){

            splitDate = $(bdate).val().split('-');
            var age = currentYear - splitDate[0];

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

    
