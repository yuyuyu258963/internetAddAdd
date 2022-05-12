import React, { useEffect } from 'react'

import "./index.css"


type Props = {}

export default function TestDemo({}: Props) {
  // 有浏览器兼容问题
  useEffect(() => {
    console.log('useEffect')
    const myDiv = document.getElementById('fileloder') as Element
    console.log('myDiv', myDiv)
    myDiv.addEventListener("dragenter", (ev:any) => {
      console.dir("dragenter")
      ev.stopPropagation()
      ev.preventDefault()
    }, false);
    myDiv?.addEventListener("dragover", (ev:any) => {
      console.dir("dragenter")
      ev.stopPropagation()
      ev.preventDefault()
    }, false);
    myDiv?.addEventListener("drop", (ev:any) => {
      console.dir("drop")
      ev.stopPropagation()
      ev.preventDefault()
      const files = ev.dataTransfer.files;
      console.dir(files)
    },false);
    myDiv?.addEventListener("drag", (ev:any) => {
      ev.stopPropagation()
      ev.preventDefault()
    },false);
    myDiv?.addEventListener("dragleave", (ev:any) => {
      ev.stopPropagation()
      ev.preventDefault()
    },false);


    
  }, [])
  
  
  return (
    <div className="test-demo">
      <header>TestDemo</header>
      <div className="file-upload" id="fileloder"
        contentEditable={true}
        // onDragOver={(e) => {
        //   e.preventDefault()
        // }}
        // onDragEnter={(e) => {
        //   console.dir("onDragEnter")
        //   console.dir(e)
        // }} 
        // onDrop={(e) => {
        //   // e.preventDefault();
        //   console.dir("onDrop")
        //   e.preventDefault()
        // }}
        
        >
        {/* 文件拖拽到此处上传 */}
      </div>
    </div>
  )
}