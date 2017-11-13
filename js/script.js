/* Menu left > */

/* Manage current menu item */



function setCurrentMarkOnMenuItem() {
    var page = $('[data-page]').attr('data-page');
    switch (page) {
        case 'dashboard':
            $('[data-menu-item=' + page + ']').addClass('current');
            $('[data-menu-item="organization_group"]').addClass('current');
            break;
        case 'users':
            $('[data-menu-item=' + page + ']').addClass('current');
            $('[data-menu-item="organization_group"]').addClass('current');
            break;
        case 'operation_history':
            $('[data-menu-item=' + page + ']').addClass('current');
            break;
        case 'assets':
            $('[data-menu-item=' + page + ']').addClass('current');
            $('[data-menu-item="assets_group"]').addClass('current');
            break;
        case 'new_asset':
            $('[data-menu-item=' + page + ']').addClass('current');
            $('[data-menu-item="assets_group"]').addClass('current');
            break;
    }
}

setCurrentMarkOnMenuItem();


/* Menu items > */
var menu_items_height = [44 * 2, 0, 44 * 2];
var menu_items_counter = 0;

/* Collect all heights of inner ul elements */

$('.menu_lvl_1').each(function() {
    var list = $(this).find('>ul');
    //var list_height = list.innerHeight();
    list.attr('data-inner-menu', menu_items_counter++);
    /*menu_items_height.push(list_height);*/
});


/* Menu onclick event handler */

$('.menu_lvl_1').on('click', function() {

    if (!$(this).hasClass('active') && !$(this).hasClass('current')) {
        resetActiveMenuItems.call($(this))

        $(this).addClass('active');

        var inner_list = $(this).find('>ul');
        var current_inner_list_height = menu_items_height[+$(inner_list).attr('data-inner-menu')];

        inner_list.css('height', current_inner_list_height);

    } else {
        resetActiveMenuItems.call($(this))
    }

});

/* Set all heights of non-active inner ul elements to 0 */

$('.menu_lvl_1:not(.current) >ul').css('height', '0px');



function resetActiveMenuItems() {
    $(this).parent().find('.active:not(.current)').removeClass('active');
    $(this).parent().find('.menu_lvl_1:not(.current) >ul').css('height', '0px');
}
/* < Menu items */

/* Menu mobile > */

$('.menu_trigger').on('click', function() {

    $('.menu_left, .menu_shim, .menu_under_shim, .logout').toggleClass('active');
})

$('.menu_shim').on('click', function() {
    $('.menu_left, .menu_shim, .menu_under_shim, .logout').removeClass('active');

})


/* < Menu mobile */

/* < Menu left */


/* Manage Input > */




$('.block_name .bttn, .block_signatures .bttn').on('click', function() {

    var inp_block = $(this).parent().parent().find('input');
    var bttn_panel = $(this).parent().parent().find('.panel_bttn');
    var input_val;

    if (!inp_block.parent().hasClass('active')) {
        inp_block.parent().addClass('active');
        inp_block.focus();
        input_val = inp_block.val();
        inp_block.attr('data-value', input_val);
        inp_block.removeAttr('readonly');
        //inp_block.find('input').val('');
        bttn_panel.addClass('active');
    }
});

function changeInput(discard) {

    var inp_block = $(this).parent().parent().find('input');
    var bttn_panel = $(this).parent().parent().find('.panel_bttn');
    inp_block.parent().removeClass('active');
    inp_block.find('.input_bg .hide').css('width', 0);
    inp_block.attr('readonly', 'true');
    bttn_panel.removeClass('active');
    if (discard || /\s/g.test(inp_block.find('input').val()) || inp_block.val() == '') {
        inp_block.val(inp_block.attr('data-value'));
    }
    inp_block.attr('data-value', '');
};

$('.block_name .bttn_edit, .block_signatures .bttn_edit').on('click', function() {
    changeInput.call(this);
});

$('.block_name .bttn_cancel, .block_signatures .bttn_cancel').on('click', function() {
    changeInput.call(this, true);
});



$('.block_owners .single_owner .bttn_delete').on('click', function() {

    $(this).parent().parent().remove();



})

/* < Manage Input */

/* Info popup > */

var popup_mark = false;


// $('.popup_info_trigger').on('click', function () {

// 	var $this = $(this);
// 	var popup = $this.find('.popup_info');

// 	if (!popup_mark) {
// 		popup_mark = true;
// 		if (!$this.hasClass('active')) {
// 			hidePopup($('.popup_info_trigger.active'), $('.popup_info.active'));
// 			popup.css('display', 'block');
// 			setTimeout(function () {
// 				$this.addClass('active');
// 				popup.addClass('active');
// 			}, 100);

// 		} else {
// 			hidePopup($this, popup);
// 		}
// 	}

// 	function hidePopup(trigger, element) {
// 		trigger.removeClass('active');
// 		element.removeClass('active');

// 		setTimeout(function () {
// 			element.css('display', 'none');
// 			popup_mark = false;
// 		}, 300);
// 	}
// })

/* < Info popup */


new Clipboard('.bttn_copy');


/* Manage users */

$('.trig').on('click', function() {

    if (!$(this).hasClass('active')) {
        $('.tabs_content').find('.' + $('.trig.active').attr('data-tab') + '').removeClass('active');
        $('.trig.active').removeClass('active');
        $(this).addClass('active');
        $('.tabs_content').find('.' + $(this).attr('data-tab') + '').addClass('active');
    }
});

$('.cell_remove i').on('click', function() {
    $(this).parent().parent().remove();
});

//Pop up window
(function() {
    var modal = document.getElementById('myModal');
    var btn = document.getElementById('myBtn');

    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    windows.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}());