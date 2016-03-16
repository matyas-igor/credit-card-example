Template.creditCardForm.onCreated(function() {
  this.state = new ReactiveDict("CreditCardForm");
  
  this.onSubmit = function() {
    // receiving data from reactive dict (sorry, no getAll method available)
    var data = {
      name: this.state.get('form.name'),
      number: this.state.get('form.number'),
      month: parseInt(this.state.get('form.month')),
      year: parseInt(this.state.get('form.year')),
      cv: this.state.get('form.cv')
    };

    // validation using SimpleSchema
    var CreditCardSchema = new SimpleSchema({
      name: {
        type: String,
        max: 100
      },
      number: {
        type: String,
        regEx: /^\d{4} \d{4} \d{4} \d{4}$/
      },
      month: {
        type: Number,
        min: 1,
        max: 12
      },
      year: {
        type: Number,
        min: 0,
        max: 99
      },
      cv: {
        type: String,
        regEx: /^\d{3}$/
      }
    });

    // throw error when something is wrong
    CreditCardSchema.validate(data);
    
    // sending data
    alert('Data successfuly sent');
    
  }.bind(this);

});

Template.creditCardForm.helpers({
  form: function() {
    return {
      name: Template.instance().state.get('form.name'),
      number: Template.instance().state.get('form.number'),
      month: Template.instance().state.get('form.month'),
      year: Template.instance().state.get('form.year'),
      cv: Template.instance().state.get('form.cv')
    }
  },
  error: function() {
    return {
      name: Template.instance().state.get('error.name'),
      number: Template.instance().state.get('error.number'),
      month: Template.instance().state.get('error.month'),
      year: Template.instance().state.get('error.year'),
      cv: Template.instance().state.get('error.cv')
    }
  },
  invalid: function() {
    return _.values({
        number: Template.instance().state.get('error.number'),
        cv: Template.instance().state.get('error.cv')
      }).filter(function(error) { return error; }).length > 0;
  }
});

Template.creditCardForm.events({
  'submit [ref="credit-card-form"]': function (event, template) {
    event.preventDefault();
    template.onSubmit();
  },
  'input [ref="name"]': function(event, template) {
    template.state.set("form.name", $(event.target).val().toUpperCase());
  },
  'input [ref="number"]': function(event, template) {
    if (!$(event.target).val().match(/^\d{4} \d{4} \d{4} \d{4}$/)) {
      template.state.set("error.number", 'Card number should be like XXXX XXXX XXXX XXXX');
    } else {
      template.state.set("error.number", null);
    }
    template.state.set("form.number", $(event.target).val());
  },
  'input [ref="month"]': function(event, template) {
    template.state.set("form.month", $(event.target).val());
  },
  'input [ref="year"]': function(event, template) {
    template.state.set("form.year", $(event.target).val());
  },
  'input [ref="cv"]': function(event, template) {
    if (!$(event.target).val().match(/^\d{3}$/)) {
      template.state.set("error.cv", 'CV code should be XXX');
    } else {
      template.state.set("error.cv", null);
    }
    template.state.set("form.cv", $(event.target).val());
  }
});
