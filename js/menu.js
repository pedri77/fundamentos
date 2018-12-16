export class Menu {
    constructor () {
        // navs
        this.oBotonMenu1 = document.querySelector('#menu-btn-1')
        this.oBotonMenu2 = document.querySelector('#menu-btn-2')
        this.oMenuTop =  document.querySelector('#menu-top')
        this.oMenuBottom = document.querySelector('#menu-bottom')
        // Otros
        this.aMenuItems = document.querySelectorAll("nav#menu-top a")
        this.aSections = document.querySelectorAll("section")
        this.oOffsets = []

        // Manejadores de eventos
        this.oBotonMenu1.addEventListener('click', this.toggleMenu.bind(this))
        this.oBotonMenu2.addEventListener('click', this.toggleMenu.bind(this))
        this.aMenuItems.forEach(
            (item) => { 
                item.addEventListener('click', this.activarItem.bind(this))
                // Smooth Scrolling
                item.addEventListener('click', this.smoothScroll.bind(this))
            }
        )
        window.addEventListener('scroll', this.changeMenuStyle.bind(this))

        // Método para calcular la posición de las diferentes sections
        this.prepararNavegacion()
    }

    // Calcula la posición actual donde está el scroll
    getPageScroll() {
        var yScroll;
      
        if (window.pageYOffset) {
          yScroll = window.pageYOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {
          yScroll = document.documentElement.scrollTop;
        } else if (document.body) {
          yScroll = document.body.scrollTop;
        }
        return yScroll;
      }
    
    // Calcula la posición del elemento destino
    elmYPosition(eID) {
        var elm = document.querySelector(eID)
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }    
    
    // Realiza el proceso de smooth Scroll
    smoothScroll(oE) {
        //console.dir(oE)
        //console.log('Pulsado elemento en Y:'+oE.y+' con destino '+oE.target.hash)

        var startY = this.getPageScroll(); //oE.y;
        var stopY = this.elmYPosition(oE.target.hash);

        //console.log(startY);
        //console.log(stopY);

        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }

        // Cálculos para ver a qué velocidad desplazar el scroll
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;

        // Hay que diferenciar el smoth scrolling si es hacia arriba o hacia abajo
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        return false;
    }

    toggleMenu(oE) {
        oE.preventDefault()
        // cambia su visibilidad
        oE.target.classList.toggle('menu-hide')
        // cambia la visibilidad del otro icono
        if (oE.target.previousElementSibling) {
            oE.target.previousElementSibling.classList.toggle('menu-hide')
        } else {
            oE.target.nextElementSibling.classList.toggle('menu-hide')
        }
        // cambia la visibilidad del menu top para mobile
        this.oMenuTop.classList.toggle('menu-hide')
    }

    activarItem(oE) {
        //console.log('Activando Item')
        this.aMenuItems.forEach(
            (item) => { item.classList.remove('active')}
        )
        oE.target.classList.add('active')
    }

    changeMenuStyle () {
        let pageOffset = window.pageYOffset
        let menuItem = 0
        if (pageOffset >=  this.oOffsets['#home'] && pageOffset < this.oOffsets['#quien_soy']) {
            menuItem = 0
        } else if (pageOffset >= this.oOffsets['#quien_soy'] && pageOffset < this.oOffsets['#estudios']) {
            menuItem = 1
        } else if (pageOffset >= this.oOffsets['#estudios'] && pageOffset < this.oOffsets['#experiencia']) {
            menuItem = 2
        } else if (pageOffset >= this.oOffsets['#experiencia'] && pageOffset < this.oOffsets['#sobre_mi']) {
            menuItem = 3
        } else if (pageOffset >= this.oOffsets['#sobre_mi'] && pageOffset < this.oOffsets['#contacto']) {
            menuItem = 4
        } else {
            menuItem = 5
        }
        this.aMenuItems.forEach(
            (item) => item.classList.remove('active')
        )
        this.aMenuItems[menuItem].classList.add('active')
    }

    prepararNavegacion() {
        this.aSections.forEach(
            (item) => {
                let cumulative =  this.cumulativeOffset(item);
                this.oOffsets['#'+item.id] = cumulative;
            }
        )
    
    }

    cumulativeOffset (element) {
        var top = 0;
        do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
        } while(element);
        return top;
    };
}
