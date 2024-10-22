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
});

(function() {

    const styles = {
        rectangle: function(img, config, callback) {            
            // Funkce pro vytvoření kontejneru a gridu
            function generateGrid(img, style) {
                const container = $('<div class="image-container"></div>');
                img.wrap(container); // Zabalíme obrázek do containeru
    
                // Zjistíme skutečné rozměry obrázku
                const imgWidth = img.width();
                const imgHeight = img.height();
    
                // Nastavíme pevnou velikost čtverce
                const squareSize = config.size || 40; // Velikost jednoho čtverce v pixelech
    
                // Vypočítáme počet sloupců a řádků
                const columns = Math.ceil(imgWidth / squareSize);
                const rows = Math.ceil(imgHeight / squareSize);
    
                // Vytvoříme grid overlay a přidáme ho do containeru
                const gridOverlay = $('<div class="grid-overlay"></div>');
                img.after(gridOverlay);
    
                // Nastavíme grid layout dynamicky podle počtu řádků a sloupců
                gridOverlay.css({
                    'display': 'grid',
                    'grid-template-columns': `repeat(${columns}, 1fr)`,
                    'grid-template-rows': `repeat(${rows}, 1fr)`,
                    'width': imgWidth,
                    'height': imgHeight,
                    'position': 'absolute',
                    'top': 0,
                    'left': 0
                });
    
                // Vytvoříme jednotlivé čtverce mřížky
                for (let i = 0; i < columns * rows; i++) {
                    const square = $('<div></div>');
                    square.css({
                        'width': `${squareSize}px`,
                        'height': `${squareSize}px`,
                        'opacity': 1 || config.opacity,
                        'background-color': config.color || 'rgba(255, 255, 255, 1)',
                        'transition': `transform ${config.speed}ms ease, opacity ${config.speed}ms ease`
                    });
                    gridOverlay.append(square);
                }
    
                // Spustíme animaci na základě zvoleného stylu
                animateSquares(gridOverlay, config);
            }
    
            // Funkce pro animaci čtverců
            function animateSquares(gridOverlay, config) {
                $(gridOverlay).find("div").each(function(index) {                    
                    const delay = Math.random() * config.delay; // náhodné zpoždění                    
                    const square = $(this);
                    
                    setTimeout(() => {
                        if (config.movement == 'rotate') {
                            square.css({
                                'opacity': 0,
                                'transform': `rotateY(${config.degree}deg)`
                            });
                        } else {
                            // Výchozí animace bez rotace
                            square.css({
                                'opacity': 0
                            });
                        }
                    }, delay);                        
                });
            }
            generateGrid(img, config.style);
        }
    };

    $.fn.evanimate = function(config = {}) {
        if(!$(this).is("img")) return;
        config = buildConfig(config, this);                   
        if(!styles[config.style]) throw new Error(`Unknown style '${config.style}'`);
        const img = $(this);        
        img.on('load', function() {
            styles[config.style](img, config);
        });        
        if (img.prop('complete')) {
            styles[config.style](img, config);
        }
    };

    function buildConfig(config, e) {
        if(!config || Object.keys(config || {}).length == 0) config = {};
        config.style = config.style || $(e).data('style') || 'rectangle';
        config.speed = config.speed || $(e).data('speed') || 500;
        config.movement = config.movement || $(e).data('movement') || 'rotate';      
        config.delay = config.delay || $(e).data('delay') || 500;
        config.degree = config.degree || $(e).data('degree') || 180; 
        config.opacity = config.opacity || $(e).data('opacity') || 0.3;
        config.size = config.size || $(e).data('size') || 100;
        return config;
    }

    $(function() {
        /** autofind data-animate tags */
        $(`[data-animate]`).each(function() {
            $(this).evanimate();
        });    
    });        
})();
