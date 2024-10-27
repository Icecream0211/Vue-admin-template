import request from "@/utils/request";
import type { CategoryResponseData,AttrResponseData,Attr } from "./type";


enum API {
  //获取全部分类
  CATEGORY_URL = '/admin/product/getCategory1',
  //根据一级分类id获取二级分类
  CATEGORY2_URL = '/admin/product/getCategory2/',
  //根据二级分类id获取三级分类
  CATEGORY3_URL = '/admin/product/getCategory3/',
  //根据一级分类id获取一级分类数据
  ATTR_INFO_URL = '/admin/product/attrInfoList/',
  Add_Or_Update_Attr = '/admin/product/saveAttrInfo',
  DELETE_ATTR_URL = '/admin/product/deleteAttr/',
};


const reqC1 = () => request.get<any,CategoryResponseData>(API.CATEGORY_URL);

const reqC2 = (c1Id:number|string) => request.get<any,CategoryResponseData>(API.CATEGORY2_URL+c1Id);


const reqC3 = (c2Id:number|string) => request.get<any,CategoryResponseData>(API.CATEGORY3_URL+c2Id);

const reqAllAttrInfo = (c1Id:number|string,c2Id:number|string,c3Id:number|string) => request.get<any,AttrResponseData>(API.ATTR_INFO_URL+c1Id+'/'+c2Id+'/'+c3Id)


const reqAddOrUpdateAttr = (data:Attr) => request.post<any,any>(API.Add_Or_Update_Attr,data);

const reqDeleteAttr = (attrId:number) => request.delete<any,any>(API.DELETE_ATTR_URL+attrId)

export {
  reqC1,
  reqC2,
  reqC3,
  reqAllAttrInfo,
  reqAddOrUpdateAttr,
  reqDeleteAttr
};