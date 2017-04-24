$(document).ready(function(){
	var modal_ajax = (function(){
		var st={
			tplTemplate 	 : "#tplTemplate",
			tbody					 : "#tbody",
			btnDiv		  	 : "#btnDiv",
			btnTabla	 		 : "#btnTabla",
			table				   : "#table",
			tplTemplateDiv : "#tplTemplateDiv",
			containerDiv   : "#containerDiv",
			divTable		   : ".div_table"
		}
		var dom={}
		var global={}
    
    var beforeCatchDom = function(){
    	$(document).ready(events.mostrarTable);
    } 

		var catchDom = function(){
			dom.tplTemplate    = $(st.tplTemplate);
			dom.tbody			  	 = $(st.tbody);
			dom.btnDiv			   = $(st.btnDiv);
			dom.btnTabla	     = $(st.btnTabla);
			dom.table  		 	   = $(st.table);
			dom.tplTemplateDiv = $(st.tplTemplateDiv);
			dom.containerDiv   = $(st.containerDiv);
			dom.divTable       = $(st.divTable);
		}

		var afterCatchDom = function(){
			global.compiled = _.template(dom.tplTemplate.html());
		}

		var suscribeEvents = function(){
			dom.btnDiv.on("click", events.mostrarDiv);
			dom.btnTabla.on("click",events.mostrarTabla);
		}
		var events = {
			mostrarTable : function(){
				$.getJSON("https://jsonplaceholder.typicode.com/posts?userId=2",function(value){
					$.each(value,function(val,object){
						var htmlCompiled = global.compiled({
							mivariable_user  : object.userId,
							mivariable_id    : object.id,
							mivariable_title : object.title,
							mivariable_body  : object.body
						});

						$(htmlCompiled).appendTo(dom.tbody);
					});
				});
			},
			mostrarDiv : function(){
				$(".div_table").removeClass("div_table").addClass("div_block");
				$(".container_table").removeClass("container_table").addClass("div_tab");
				dom.table.hide();
				dom.tbody.show();
				btnDiv.disabled=true;
			},
			mostrarTabla : function(){
				btnDiv.disabled=false;
				dom.table.show();
				$(".div_block").removeClass("div_block").addClass("div_table");
				$(".div_tab").removeClass("div_tab").addClass("container_table");
			}
		}
		var initialize = function(){
			beforeCatchDom();
			catchDom();
			afterCatchDom();
			suscribeEvents();
		}
		return{
			init:initialize
		}
	})()
	modal_ajax.init();
});