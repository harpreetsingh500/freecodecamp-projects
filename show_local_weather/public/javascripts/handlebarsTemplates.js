this["JST"] = this["JST"] || {};

this["JST"]["temp"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<img src="
    + alias4(((helper = (helper = helpers.weatherImage || (depth0 != null ? depth0.weatherImage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"weatherImage","hash":{},"data":data}) : helper)))
    + " />\r\n<p data-temp="
    + alias4(((helper = (helper = helpers.temp || (depth0 != null ? depth0.temp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"temp","hash":{},"data":data}) : helper)))
    + " data-tempunit="
    + alias4(((helper = (helper = helpers.unit || (depth0 != null ? depth0.unit : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"unit","hash":{},"data":data}) : helper)))
    + ">"
    + alias4(((helper = (helper = helpers.tempAndUnit || (depth0 != null ? depth0.tempAndUnit : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tempAndUnit","hash":{},"data":data}) : helper)))
    + "</p>\r\n<button>Convert to Celsius</button>\r\n";
},"useData":true});

this["JST"]["weather"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<p>City: "
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + "</p>\r\n<p>Condition: "
    + alias4(((helper = (helper = helpers.condition || (depth0 != null ? depth0.condition : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"condition","hash":{},"data":data}) : helper)))
    + "</p>\r\n";
},"useData":true});