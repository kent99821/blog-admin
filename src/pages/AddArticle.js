import React, { useEffect, useState } from "react";
import '../assets/css/AddArticle.css';
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/solarized-dark.css';
import servicePath from "../config/apiUrl";
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
    const [articleId, setArticleId] = useState(0);//文章id 如果0说明新增的
    const [articleTitle, setArticleTitle] = useState("");//文章标题
    const [articleContent, setArticlecontent] = useState("");//markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState("预览内容");//html内容
    const [introducemd, setIntroducemd] = useState();//简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
    const [showDate, setShowDate] = useState();//发布日期
    const [updateDate, setUpdateDate] = useState();//修改的日期
    const [typeInfo, setTypeInfo] = useState([]); //文章类别信息
    const [selectedType, setSelectType] = useState('文章类别');//选择的文章类别

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    const changeContent = (e) => {
        setArticlecontent(e.target.value);
        let html = marked(e.target.value);
        setMarkdownContent(html);
    }
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value);
        let html = marked(e.target.value);
        setIntroducehtml(html);
    }
    const selectedTypeHandler = (value)=>{
        setSelectType(value);
    }
    // 获取文章类别
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(
            res =>{
                console.log(res.data);
                if(res.data.code === 200){
                    setTypeInfo(res.data.data);
                }else{
                    localStorage.removeItem('openId');
                    props.history.push('/admin/index');
                }
            }
        )

    }
    // 获取文章分类
    useEffect(()=>{
        getTypeInfo()
    },[]);
    // 文章保存
    const saveArticle=()=>{
        if(!selectedType){
            message.info('请输入文章类别');
            return false;
        }else if(!articleTitle){
            message.info('请输入文章名称');
            return false;
        }else if(!articleContent){
            message.info('请输入文章内容');
            return false;
        }else if(!introducemd){
            message.info('请输入文章简介');
            return false;
        }else if(!showDate){
            message.info('发布日期不能为空');
            return false;
        }
        message.success('检验通过');
        let dataProps = {};
        dataProps.type_id = selectedType;
        dataProps.title = articleTitle;
        dataProps.article_content = articleContent;
        dataProps.introduce = introducemd;
        let dateText = showDate.replaceAll('-','/');
        // dataProps.addTime = (new Date(dateText).getTime())/1000;
        // console.log(dataProps);
        
        if(articleId === 0){
            dataProps.view_count = 0;
            console.log(dataProps);
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                withCredentials:true
            }).then(
                res=>{
                    setArticleId(res.data.insertId);
                    if(res.data.isSuccess){
                        message.success("文章保存成功");
                    }else{
                        message.error("文章保存失败");
                    }
                }
            )
        }




    }
    return (

        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input 
                            onChange={e=>{
                                setArticleTitle(e.target.value)
                            }}
                            placeholder="文章标题" size="large" />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectedTypeHandler}>
                                {
                                    typeInfo.map((item,index)=>{
                                        return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea className="markdown-content"
                                rows={35} placeholder="文章内容" onChange={changeContent} />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}
                            >

                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;&nbsp;&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                            />
                            <br /><br />
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: "文章简介：" + introducehtml }}
                            ></div>
                        </Col>

                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(date,dateString)=>setShowDate(dateString)}
                                    placeholder="发布日期"
                                    size="large"
                                />

                            </div>
                        </Col>
                        {/* <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="修改日期"
                                    size="large"
                                />
                                
                            </div>
                        </Col> */}
                    </Row>
                </Col>
            </Row>

        </div>
    );

}

export default AddArticle;