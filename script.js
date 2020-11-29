function validate(input, val) {
  if(val === "") {
    $("#"+input).addClass("error");
    return false
  } else if (input === "email") {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(val)) {
      $("#"+input).addClass("error");
      return false
    }
  }
  return true;
}

function onChange($this) {
   var valid = validate($this.id, $this.value),
        $input = $("#"+$this.id);
    if(!valid) {
      $input.addClass("error");
    } else {
       $input.removeClass("error");
       $input.addClass("valid");
    }
}

$(document).ready(function () {

  var $fields = $("input, textarea");

  $fields.change(function() {
    onChange(this);
  });

  $fields.keyup(function() {
    onChange(this);
  });

  $(".enquire").click(function () {
    $(".overlay").css("right", "0");
  });

   $("#close").click(function () {
    $(".overlay").css("right", "-120vw");
  });

  $("#submit").click(function () {
    var form = $(".enquiry-form"),
      $name = $("#name"),
      $email = $("#email"),
      $message = $("#message");

    if ($name.hasClass("valid") && $email.hasClass("valid") && $message.hasClass("valid")) {
      var dataString = 'name=' + $name.val() + '&email=' + $email.val() + '&message=' + $message.val();
      $.ajax({
        type: "POST",
        url: "",
        data: dataString,
        cache: false,
        success: function (result) {
          $fields.prop('disabled', true);
          $("#submit").prop('disabled', true);
          $(".response").addClass("success").html(result);
        }
      });
    } else {
       $(".response").addClass("error").html("Please correctly fill in all details");
    }
    return false;
  });

});
