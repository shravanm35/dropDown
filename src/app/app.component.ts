import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "dropDownMenu";
  productsList = [];
  currentClicked: any;
  subCategories: any;
  public searchInput: String = "";
  public searchInputSubProduct: String = '';
  searchResult: any[];
  subProducts: any;
  searchResultSubProduct: any;
  currentChildClicked: any;
  selectedProducts=[];
  selectedCategories=[];
  selectedSubProducts= [];
  showResult: boolean =false;
  constructor() {
    this.productsList = [
      {
        name: "Automatic Control Engg",
        value: "",
        subcatageories: [
          { name: "Bearings", value: "",
          subproducts: [
            { name: "Blue Collector", value: "" },
            { name: "Yellow Collector", value: "" }        ]
           },
          { name: "Curent Collectors", value: "" }
        ]
      },
      { name: "Communication Equipment", value: "" },
      { name: "Electric Motors", value: "" },
      { name: "Electric Components", value: "" },
    ];
  }
  public dropDownClicked(index,level,index2,index3 ?:number) {
    this.currentClicked = index;
    if(level == 'parent'){
      if(this.selectedProducts.includes(this.productsList[index].name))
      {
        this.selectedProducts=  this.selectedProducts.filter(item => item !== this.productsList[index].name);
      }else{
        this.selectedProducts.push(this.productsList[index].name);
      }
      if(this.productsList[index]["subcatageories"]){
        this.subCategories = this.productsList[index]["subcatageories"];
        this.searchResult = this.subCategories;
      }
      else{
        this.subCategories = [];
      }
    }
    else if(level == 'child'){
      this.currentChildClicked = index2;
      if(this.productsList[index]["subcatageories"][index2]){
        if(this.selectedCategories.includes(this.productsList[index]["subcatageories"][index2].name))
        {
          this.selectedCategories=  this.selectedCategories.filter(item => item !== this.productsList[index]["subcatageories"][index2].name);
        }else{
          this.selectedCategories.push(this.productsList[index]["subcatageories"][index2].name);
        }
        this.subProducts = this.productsList[index]["subcatageories"][index2]["subproducts"];
        this.searchResultSubProduct = this.subProducts;
      } else {
        this.subProducts = [];
      }
    } else{
      if(this.selectedSubProducts.includes(this.productsList[index]["subcatageories"][index2]["subproducts"][index3].name)){
        this.selectedSubProducts = this.selectedSubProducts.filter(item => item != this.productsList[index]["subcatageories"][index2]["subproducts"][index3].name)
      }else{
        this.selectedSubProducts.push(this.productsList[index]["subcatageories"][index2]["subproducts"][index3].name);
      }

    }
    console.log('category',this.selectedCategories,
    'products',this.selectedProducts,'subproduct',this.selectedSubProducts);
  }

  public searchData(event: any, level) {
    if(level == 'parent')
    {
      if (event.target.value === "") {
        this.searchResult = this.subCategories;
        return (this.searchResult);
      }
      else{
        this.searchResult = this.subCategories.filter((series) => {
          return series.name
            .toLowerCase()
            .startsWith(event.target.value.toLowerCase());
        });
      }
    }else{
      if (event.target.value === "") {
        this.searchResultSubProduct = this.subProducts;
        return (this.searchResultSubProduct);
      }
      else{
        this.searchResultSubProduct = this.subProducts.filter((series) => {
          return series.name
            .toLowerCase()
            .startsWith(event.target.value.toLowerCase());
        });
      }
    }
  }
  getDropDownStatus(value,name){
  if(name == 'child')
  {
    return this.selectedCategories.includes(value);
  }else if(name == 'parent'){
    return this.selectedProducts.includes(value);
  }else{
    return this.selectedSubProducts.includes(value);
  }
}
doneClick(){
  this.showResult=true;
}
}
