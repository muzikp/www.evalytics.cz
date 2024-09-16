/* global $*/

$(function(){
    $(".contact-form").submit(function(event) {                
        $(".contact-form").find(`[type="submit"]`).attr("disabled", true);
        event.preventDefault();
        const formData = JSON.stringify($(this).serializeArray());
        console.log(JSON.stringify(formData, null, "\t"));
        const url = "https://api.evalytics.org/v1/ses?app=nVUw6dExVdtEdUL8q";
        $.ajax({
            method: 'POST',
            url: url,
            dataType: 'json',
            contentType: 'application/json',
            crossDomain: true,
            data: formData,
            success: function(response) {                
                iziToast.success({
                    title: 'Odesláno',
                    message: 'Vaše zpráva byla úspěšně odeslána.'
                });
                //$(".career-form").find(`[type="submit"]`).attr("disabled", false);
            },            
            error: function(xhr, status, error) {                
                iziToast.error({
                    title: 'Odeslání se nezdařilo',
                    message: 'Vaši zprávu se nepodařilo odeslat. Zprávu můžete poslat na info@evalytics.cz.'
                });
                //$(".career-form").find(`[type="submit"]`).attr("disabled", false);
            }
        });
    });
})