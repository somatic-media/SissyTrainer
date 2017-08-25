function resetForm() {
    showAll()
    $('input[name=action]').prop('checked', false)


    $("option:selected").prop("selected", false)

    $('#hard').prop('checked', false)
    $('#prostate').prop('checked', false)

    $('#prepare').val('')
    $('#description').val('')
}

function showAll() {
    $('#panelStrokes').show()
    $('#panelFucking').show()
}


function loadForm(clip) {
    $('_id').val(clip._id)
    $('video')[0].src = "clips/" + clip._id + '.mp4';

    if (!clip.action && !clip.position && !clip.deep && !clip.strokes) //defaults
    {
        $('input[name=action][value=Fucking]').prop('checked', true)
        $('#deep option[value=Medium]').prop("selected", true)
        $('#strokes option[value=1]').prop("selected", true)
        return
    }

    $('input[name=action][value=' + clip.action + ']').prop("checked", true)
    $('#position option[value=' + clip.position + ']').prop("selected", true)
    $('#deep option[value=' + clip.deep + ']').prop("selected", true)
    $('#strokes option[value=' + clip.strokes + ']').prop("selected", true)
    $('#hard').prop('checked', !!clip.hard)
    $('#prostate').prop('checked', !!clip.prostate)

    $('#prepare').val(clip.prepare)
    $('#description').val(clip.description)

}
function serializeForm() {
    return {
        _id: $('_id').val(),
        action: $('input[name=action]:checked').val(),
        position: $('#position').val(),
        hard: $('#hard').prop('checked'),
        prostate: $('#prostate').prop('checked'),
        deep: $('#deep').val(),
        strokes: $('#strokes').val(),
        prepare: $('#prepare').val(''),
        description: $('#description').val(''),
        duration: $('video').duration
    }
}



function initForm() {
    $('[name=action]').click(function () {
        var optType = $('[name=action]:checked').val();
        var sw = {
            Fucking: function () {
                showAll()
                $('input[name=action][value=Fucking]').prop('checked', true)
            },
            Insert: function () {
                showAll()
                $('input[name=action][value=Insert]').prop('checked', true)
                $('#panelStrokes').hide()
            },
            Pullout: function () {
                showAll()
                $('input[name=action][value=Pullout]').prop('checked', true)
                $('#panelStrokes').hide()
                //$('#panelFucking').hide()
            },
            Cum: function () {
                showAll()
                $('#panelFucking').hide()
            }
        };
        sw[optType]();


    })
    $('#folder').on('change', function () {
        console.log(this.value)
    })

    var video = $('video')[0];
    $('#strokes').hover(
        function () {
            video.playbackRate = 0.5;
            video.currentTime = 0;

        },
        function () {
            video.playbackRate = 1;

        })
    $('#next').click(function () {
        resetForm();
        save();
    });
    $('#skip').click(function () {
        resetForm();
        skip();
    });

    save()
}
function save() {
    $.ajax({
        url: 'clipMaker/Save',
        type: 'post',
        data: serializeForm(),
        success: function (clip) {
            loadForm(clip)
        }
    })

}
function skip() {
    var video = $('video')[0];
    $.ajax({
        url: 'clipMaker/skip',
        success: function (clip) {
            loadForm(clip)
        }
    })

}
$(document).ready(function () {
    initForm();
    resetForm();
});