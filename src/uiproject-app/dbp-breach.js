import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/iron-ajax/iron-ajax.js';

class DbpBreachApp extends PolymerElement {
    constructor(){
        super();
    }
    ready(){
        super.ready();
    }
    connectedCallback(){
        super.connectedCallback();
        // this.$.franchiseSelect.addEventListener('selected-item-label-changed',function(e){
        //     debugger;
            
        // }.bind(this));
this.$.breachForm.contentType = "application/json";
        this.$.breachForm.addEventListener('iron-form-submit', function(event) {
            let data = {  
      "fId":"1",//this.selFcId,
      "baId":"1",//this.baId,
  "userId": 1,
 "adminId":2,
      "breachId":"1"//this.bcId
    };
 this.$.formAjax.contentType = "application/json";
            this.$.formAjax.body=JSON.stringify(data);
 this.$.formAjax.generateRequest();
    
  }.bind(this));

    }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .businessSelect{
            display:none;
        }
        .businessSelectShow{
            display:block;
        }
        .card{
            margin:0 auto;
            padding:25px;
            width:600px;
            borde-radius:5px;
            border:1px #ccc solid;
        }
        #notifyMsg{
            background:green;
        }
      </style>
      <iron-ajax
          auto
          url="http://10.117.189.48:3003/api/getData"
          handle-as="json"
          method="GET"
          on-response="_handleResponse">
      </iron-ajax>
      
      <iron-ajax
          id="formAjax"
          url="http://10.117.189.48:3003/api/submit"
          handle-as="json"
          method="POST"
          on-response="_handleSubResponse">
      </iron-ajax>

      <div class="card">
      <h2>Data Protection Breach Submission</h2>
        <iron-form id="breachForm">
      <form>
      
    <div>
      <paper-dropdown-menu label="Select Franchise" class="franchiseSelect" id="franchiseSelect"  on-iron-select="_itemSelected" required>
      <paper-listbox slot="dropdown-content" selected="{{selectedFranchise}}">
      <template is="dom-repeat" items="[[franchiseList.franchise]]">
        <paper-item value="[[item.fid]]">[[item.fcname]]</paper-item>
        </template>
      </paper-listbox>
    </paper-dropdown-menu>
    </div>
    <div>
     <paper-dropdown-menu label="Select Business Area" class="businessSelect" id="businessSelect"  on-iron-select="_itemBusinessSelected" required>
      <paper-listbox slot="dropdown-content">
      <template is="dom-repeat" items="[[franchiseList.franchise.0.businessArea]]" as="bItem">
        <paper-item value="[[bItem.baid]]">[[bItem.baname]]</paper-item>
        </template>
      </paper-listbox>
    </paper-dropdown-menu>
    </div>
    <div>
    <paper-dropdown-menu label="Select Breach Category" class="breachCatSelect" id="breachCatSelect" on-iron-select="_itemBCatSelected" required>
      <paper-listbox slot="dropdown-content">
      <template is="dom-repeat" items="[[franchiseList.breach]]" as="cItem">
        <paper-item value="[[cItem.bId]]">[[cItem.bValue]]</paper-item>
        </template>
      </paper-listbox>
    </paper-dropdown-menu>
    </div>
    <br />
    <paper-button raised on-click="openSubmit">Submit</paper-button>
      </form>
    </iron-form>
      </div>
      <paper-toast text="Submitted Successfully" id="notifyMsg" horizontal-align="right">
</paper-toast>
    `;
  }
  static get properties() {
    return {
      user:{
          type:Object,
          value:{name: "admin1"}
      },
      franchiseList:{
          type:Object,
          value:{}
      },
      breachCatList:{
          type:Array,
          value:[],
      },
      businessList:{
          type:Object,
          value:{},
      },
      selFcName:{
          type:String
      },
      selFcId:{
          type:Number,
          notify:true
      },
      baName:{
          type:String
      },
      baId:{
          type:Number,
          notify:true
      },
      bcName:{
          type:String
      },
      bcId:{
          type:Number,
          notify:true
      }
    };
  }

  _handleResponse(e){
      this.set('franchiseList',e.detail.response);
      
  }
  _itemSelected(e){
      let selItem = e.target.selectedItem;
      this.selFcName = selItem.textContent;
      this.selFcId =selItem.getAttribute('value');
      this.$.businessSelect.classList.remove("businessSelect");
      this.$.businessSelect.classList.add("businessSelectShow");
 
  }
  _itemBusinessSelected(e){
      let selItem = e.target.selectedItem;
      this.baName = selItem.textContent;
      this.baId =selItem.getAttribute('value');
  
  }
  _itemBCatSelected(e){
      let selItem = e.target.selectedItem;
      this.bcName = selItem.textContent;
      this.bcId =selItem.getAttribute('value');
  }
  openSubmit(){
      if(this.$.breachForm.validate()){
          this.$.breachForm.submit();
      }
  }
  _handleSubResponse(e){
      this.$.notifyMsg.toggle();

  }

}

window.customElements.define('dbp-breach', DbpBreachApp);