(function () {

    // бургер меню 

    document.addEventListener('click', burgerInit)

    function burgerInit(e) {

        const burgerIcon = e.target.closest('.burger-icon')
        const burgerNavLink = e.target.closest('.nav__link')

        if (!burgerIcon && !burgerNavLink) return
        if (document.documentElement.clientWidth > 900) return

        if (!document.body.classList.contains('body--opened-menu')) {
            document.body.classList.add('body--opened-menu')
        } else {
            document.body.classList.remove('body--opened-menu')
        }

    }

    // табы 

    const tabControls = document.querySelector('.tab-controls')

    tabControls.addEventListener('click', toggleTab)

    function toggleTab(e) {

        const tabControl = e.target.closest('.tab-controls__link')

        if (!tabControl)
            e.preventDefault()
        if (tabControl.classList.contains('tab-controls__link--active')) return


        const tabContentID = tabControl.getAttribute('href')
        const tabContent = document.querySelector(tabContentID)
        const activeControl = document.querySelector('.tab-controls__link--active')
        const activContent = document.querySelector('.tab-content--show')

        if (activeControl) {
            activeControl.classList.remove('tab-controls__link--active')
        }

        if (activContent) {
            activContent.classList.remove('tab-content--show')
        }


        tabControl.classList.add('tab-controls__link--active')
        tabContent.classList.add('tab-content--show')


    }

    // этапы работы 

    new Swiper('.progress__of__work--swiper', {

        slidesPerView: 1,
        spaceBetween: 30,

        // pagination: {
        //     el: '.swiper-pagination',
        //     type: 'fraction',

        //     renderFraction: function (currentClass, totallClass) {
        //         return ' <span class="' + currentClass + '"></span>' +
        //         '' +
        //         '<span class="' + totallClass + '"<>/span>';
        //     },
        // },

        scrollbar: {
            el: '.swiper-scrollbar',
        },

        breakpoints: {
            601: {
                slidesPerView: 2,
            },
        }

    });

    new Swiper('.portfolio-swiper', {

        slidesPerView: 1,
        spaceBetween: 50,

        scrollbar: {
            el: '.swiper-scrollbar',
        },

        breakpoints: {
            601: {
                slidesPerView: 2,
            },
        }

    });

    // ------------------
    let selector = document.querySelector("#tel")
    let im = new Inputmask("+7(999) 999-99-99")
    im.mask(selector)

    let validation = new JustValidate("form")

    validation.addField("#name", [
        {
            rule: "required",
            errorMessage: "Введите имя!"
        },
        {
            rule: "minLength",
            value: 2,
            errorMessage: "Минимум 2 символа!"
        }
    ]).addField("#tel", [
        {
            validator: (value) => {
                const phone = selector.inputmask.unmaskedvalue()
                return Boolean(Number(phone) && phone.length > 0)
            },
            errorMessage: 'Введите телефон'
        },
        {
            validator: (value) => {
                const phone = selector.inputmask.unmaskedvalue()
                return Boolean(Number(phone) && phone.length === 10)
            },
            errorMessage: 'Введите телефон полностью'
        }
    ]).onSuccess(function () {
        let data = {
            name: document.getElementById("name").value,
            tel: selector.inputmask.unmaskedvalue().value,
            massage: document.getElementById("massage").value
        }
    }).onSuccess(async function () {
        let data = {
            name: document.getElementById("name").value,
            tel: selector.inputmask.unmaskedvalue(),
            msg: document.getElementById("msg").value
        }

        let response = await fetch("mail.php", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })

        let result = await response.text()

        alert(result)
    })



    // -------------------

})()