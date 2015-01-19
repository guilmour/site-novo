var AboutUs = {
  init: function() {
    this.initForm();
  },
  initForm: function(){

    function validateEmail(val){
      var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(val);
    }

    function validateQuestion(val){
      return val.trim().length > 0
    }

    function toggleUI(show, target){
      if(show){
        $(target).addClass('show');
      }else{
        $(target).removeClass('show');
      }
    }

    var form = $('section.ask-us form');

    form.on('submit', function(e){

      var loading = form.parent().find('.loading');
      var fail = form.parent().parent().find('.error');
      var success = form.parent().parent().find('.success');

      var email = form.find('input[name="email"]');
          email.message = email.parent().find('.message');

      var question = form.find('input[name="question"]');
          question.message = question.parent().find('.message');

      e.preventDefault();

      var isValidEmail = validateEmail(email.val());
      var isValidQuestion = validateQuestion(question.val());
      var canSend = isValidQuestion && isValidEmail;

      toggleUI(!isValidEmail, email.message);
      toggleUI(!isValidQuestion, question.message);
      toggleUI(false, fail);

      if(canSend){
        form.hide();

        toggleUI(false, form);
        toggleUI(true, [form,loading]);

        $.post(form.attr('action')).done(function(data){
          toggle(true, success);

        }).always(function(){
          form.show();
          toggleUI(true, [form,loading]);

        }).fail(function() {
          toggleUI(true, fail);
        });
      }


    });



  }
};

$(function(){ AboutUs.init() });
