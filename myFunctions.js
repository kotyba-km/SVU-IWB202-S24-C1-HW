    var cart =[];
    function addToCart(book) {
        cart.push(book);
    }

    // styling the choose button + adding the book to the cart
    $(".choose").click(function(){
        if($(this).hasClass('choosen')) {
            $(this).removeClass('choosen');
            cart = cart.filter(item => item.id !== $(this).data('id'));
        }else{
        $(this).addClass("choosen");
        const bookId = $(this).data('id');
        const bookName = $(this).data('name');
        const bookPrice = $(this).data('price');
        
        const book = {
            id: bookId,
            name: bookName,
            price: bookPrice
        };
        addToCart(book);
    }
    })
    document.addEventListener('DOMContentLoaded', function() {
        if(window.location.pathname.endsWith('form.html')) {
            const storedCart = localStorage.getItem('cart');
            if(storedCart) {
                cart = JSON.parse(storedCart);
                displayOrderDetails(); 
            }
        }
    })
    $('#btnSub').click(function() {
        var inputName = $(".arabicInput").val();
        var inputSNumber = $(".numberInput").val();
        var arabicRegex = /^[\u0600-\u06FF\s]+$/;
        var numberRegex = /^(0[1-9]|1[0-4])\d{9}$/;
        var inputPhone = $(".phoneInput").val();
        var validPrefixes = ['0995','099','0997','0987','0996','0982','0998','098','093','094','095','096']
        if(!arabicRegex.test(inputName) && inputName != "" ){
            $('.arabicError').text("الاسم يجب أن يكون باللغة العربية");
            $(".arabicInput").val("");
            setTimeout(function() {$(".arabicError").text("");},5000);
        }else if(!numberRegex.test(inputSNumber) ||inputSNumber == "") {
            $('.numberError').text("يجب التأكد من إدخال الرقم الوطني");
            $(".numberInput").val("");
            setTimeout(function() {$(".numberError").text("");},5000);
        }else{
            localStorage.removeItem('cart');
            $('#overlay-container').show();
            $('#overlay').show();
        }
        if(inputPhone != ""){
            const isValid = validPrefixes.some(prefix => inputPhone.startsWith(prefix));
            if(!isValid){
                $(".phoneError").text("الرقم المدخل غير صحيح");
                $(".phoneInput").val("");
                setTimeout(function() {$(".phoneError").text("");},5000);
            }
        }
    })

    // styling the input buttons  
    $(".inputs").click(function(){
        $(this).css("border","5px solid #0099CC");
        $(this).prev(".labels").css({"transform":"translate(150px,0)","color":"#0099CC","font-size":"large"});
    }).blur(function() {
        $(this).css("border","2px solid black");
        $(this).prev(".labels").css({"transform":"translate(0px,0)","color":"black","font-size":"medium"});
    })

    // showing the details of the book
    function showDetails(id) {
        $('.info').eq(id).toggleClass("active");
        $('.importantTopics').eq(id).toggleClass("active");
        
    }

    $('#overlay-container').hide();
    $('#overlay').hide(); 
    $('#remove').click(function() {
    $('#overlay-container').hide();
    $('#overlay').hide();
    window.location.href = 'home.html';
    })

    // showing the order details through jquery 
    function displayOrderDetails() {
        let orderHtml = $('#overlay').html();
        cart.forEach(item => {
            orderHtml += `<div class="table-container">
                   <div class="book-details">
                       <div class="item title">${item.name}</div>
                       <div class="item id-number">${item.id}</div>
                       <div class="item price">${item.price}</div>
                  </div>
                </div>`
        });
        $('#overlay').html(orderHtml);
    }

        // checking if the customer choose a book before clicking continue
        function checking() {
            if(cart.length == 0)
            {
                $("#warning").html("Cart is empty");
                setTimeout(function() {
                    $('#warning').html('');
                },4000)
            }else{
                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = "form.html";
            }
        }
            