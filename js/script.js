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



// $('.bttn_delete').on('click', function() {

//     var target = $(this).parent().parent().remove();



// })


var popup_mark = false;


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


//assets select
$(".custom-select").change(function() {
    $(this).find("option:selected").each(function() {
        var optionValue = $(this).attr("value");
        if (optionValue) {
            $(".text_explanation").not("." + optionValue).hide();
            $("." + optionValue).show();
        } else {
            $(".text_explanation").hide();
        }
    });
}).change();

// dashboard selection delete/add
$("#edit").on('click', function() {

    var lable = $("#edit").text().trim();

    if (lable == "Edit") {
        $("#edit").text("Save").css('color', '#E42520');
        $("#add_owner, .bttn_close").show();
    } else {
        $("#edit").text("Edit").css('color', '#969898');
        $("#add_owner, .bttn_close, .list_owners, #select_user").hide();
    }

});


$("#add_owner").on('click', function() {
    var modal = $('myModal');
    $(this).hide();
    $('.list_owners, #select_user').show();
    $('.modal-content').hide();
    var selectvalue = $('.list_owners').val();
    var modal = $('#myModal');
    var content = $('.modal-content.login_modal');
    var close = $('.close_container .close');
    $('.list_owners').on('change', function() {
        if ($('.list_owners').val() !== selectvalue) {
            modal.show();
            close.show();
            content.show();
        } else {
            modal.hide();
            close.hide();
            content.hide();
        }
    })
});
///AJAX ADD DELETE OWNERS
$("#remAdd").click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/test/test",
        data: {
            id: $("#remAdd").val(),
            access_token: $("#access_token").val()
        },
        success: function(result) {
            alert('ok');
        },
        error: function(result) {
            alert('error');
        }
    });
})

//Pop up window
(function() {
    var modal = document.getElementById('myModal');
    var btn = document.querySelector('#myBtn , .bttn_close');
    var span = document.getElementsByClassName("close_container")[0];

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