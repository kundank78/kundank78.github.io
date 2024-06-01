"use strict";(self.webpackChunkkundan_dev=self.webpackChunkkundan_dev||[]).push([[792],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return g}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?A(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},A=Object.keys(e);for(r=0;r<A.length;r++)n=A[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var A=Object.getOwnPropertySymbols(e);for(r=0;r<A.length;r++)n=A[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),l=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(i.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,A=e.originalType,i=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=l(n),g=a,c=d["".concat(i,".").concat(g)]||d[g]||f[g]||A;return n?r.createElement(c,s(s({ref:t},u),{},{components:n})):r.createElement(c,s({ref:t},u))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var A=n.length,s=new Array(A);s[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:a,s[1]=o;for(var l=2;l<A;l++)s[l]=n[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5002:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return i},default:function(){return g},frontMatter:function(){return o},metadata:function(){return l},toc:function(){return f}});var r=n(7462),a=n(3366),A=(n(7294),n(3905)),s=["components"],o={slug:"unix-system-calls",title:"Unix System Calls",author:"Kundan Kumar",author_url:"https://github.com/kundank78",author_title:"Software Engineer at JP Morgan",author_image_url:"https://avatars.githubusercontent.com/u/25195457",tags:["unix","system-calls"]},i=void 0,l={permalink:"/blog/unix-system-calls",source:"@site/blog/2024-05-17-unix-system-calls.md",title:"Unix System Calls",description:"System calls as the name implies is a request from user program for Operating System to",date:"2024-05-17T00:00:00.000Z",formattedDate:"May 17, 2024",tags:[{label:"unix",permalink:"/blog/tags/unix"},{label:"system-calls",permalink:"/blog/tags/system-calls"}],readingTime:2.24,hasTruncateMarker:!1,authors:[{name:"Kundan Kumar",title:"Software Engineer at JP Morgan",url:"https://github.com/kundank78",imageURL:"https://avatars.githubusercontent.com/u/25195457"}],frontMatter:{slug:"unix-system-calls",title:"Unix System Calls",author:"Kundan Kumar",author_url:"https://github.com/kundank78",author_title:"Software Engineer at JP Morgan",author_image_url:"https://avatars.githubusercontent.com/u/25195457",tags:["unix","system-calls"]},nextItem:{title:"Here I am",permalink:"/blog/here-i-am"}},u={authorsImageUrls:[void 0]},f=[{value:"Read System Call",id:"read-system-call",level:3},{value:"Write System Call",id:"write-system-call",level:3},{value:"File Description Offset",id:"file-description-offset",level:3}],d={toc:f};function g(e){var t=e.components,o=(0,a.Z)(e,s);return(0,A.kt)("wrapper",(0,r.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,A.kt)("p",null,"System calls as the name implies is a request from user program for Operating System to\ndo something on behalf of user program. It looks like normal function call from user program.\nWhether you want to write/read from a file, make network call etc. a system call runs behind\nthe scenes. Today we are going to cover the read/write system call and intricacies around it."),(0,A.kt)("h3",{id:"read-system-call"},"Read System Call"),(0,A.kt)("p",null,"Golang provides more abstracted ",(0,A.kt)("inlineCode",{parentName:"p"},"os")," package to do file operation. But you can directly use ",(0,A.kt)("inlineCode",{parentName:"p"},"syscall")," package\nif needed."),(0,A.kt)("pre",null,(0,A.kt)("code",{parentName:"pre",className:"language-go"},'func main() {\n    fd, err := syscall.Open("example.txt", syscall.O_RDONLY, 0)\n    if err != nil {\n        fmt.Println("Error opening file:", err)\n        return\n    }\n    defer syscall.Close(fd)\n\n    buffer := make([]byte, 1024) // buffer to store read data\n    bytesRead, err := syscall.Read(fd, buffer)\n    if err != nil {\n        fmt.Println("Error reading file:", err)\n        return\n    }\n    fmt.Printf("Read %d bytes from file:\\n%s", bytesRead, string(buffer[:bytesRead]))\n}\n')),(0,A.kt)("p",null,"Above code opens a file using ",(0,A.kt)("inlineCode",{parentName:"p"},"syscall.Open")," call which returns a file descriptor. Kernel checks if requested data is present in\nbuffer cache, if data is present it copies the data into user buffer. Otherwise, kernel makes a disk read to fetch the data and store it\nin buffer. Common pattern is to read more than what is required so next time ",(0,A.kt)("inlineCode",{parentName:"p"},"read syscall")," will result in cache hit."),(0,A.kt)("p",null,(0,A.kt)("img",{alt:"read-sys.png",src:n(9578).Z,width:"1358",height:"512"})),(0,A.kt)("h3",{id:"write-system-call"},"Write System Call"),(0,A.kt)("pre",null,(0,A.kt)("code",{parentName:"pre",className:"language-go"},'func main() {\n    fd, err := syscall.Open("example.txt", syscall.O_WRONLY | syscall.O_CREAT | syscall.O_TRUNC, 0644)\n    if err != nil {\n        fmt.Println("Error opening or creating file:", err)\n        return\n    }\n    defer syscall.Close(fd)\n    \n    data := []byte("Hello, World!\\n")\n    bytesWritten, err := syscall.Write(fd, data)\n    if err != nil {\n        fmt.Println("Error writing to file:", err)\n        return\n    }\n    fmt.Printf("Wrote %d bytes to file\\n", bytesWritten)\n}\n')),(0,A.kt)("p",null,"Here ",(0,A.kt)("inlineCode",{parentName:"p"},"syscall.Write")," writes the data in os write buffer & returns. It's the OS responsibility to write the data\nto storage layer. ",(0,A.kt)("inlineCode",{parentName:"p"},"fsync syscall")," can be used to synchronize file's data & metadata (permissions, timestamps & directory)\nto storage medium, ensuring durability & system integrity."),(0,A.kt)("p",null,(0,A.kt)("img",{alt:"write-sys.png",src:n(8113).Z,width:"1358",height:"589"})),(0,A.kt)("h3",{id:"file-description-offset"},"File Description Offset"),(0,A.kt)("ul",null,(0,A.kt)("li",{parentName:"ul"},"File Descriptor: a number to uniquely identify a open file. When file is opened, syscall returns\na file descriptor not the file path. This file descriptor points to the file description (stores metadata).")),(0,A.kt)("p",null,"All read/write in a file happens at an offset maintained by the file description which is referenced by file descriptor.\nIf write bytes are more than the file size, it simply expands to accommodate the bytes to be written. "),(0,A.kt)("p",null,(0,A.kt)("img",{alt:"img_2.png",src:n(7612).Z,width:"538",height:"225"})),(0,A.kt)("p",null,(0,A.kt)("img",{alt:"img_3.png",src:n(4877).Z,width:"542",height:"259"})),(0,A.kt)("ul",null,(0,A.kt)("li",{parentName:"ul"},(0,A.kt)("inlineCode",{parentName:"li"},"truncate syscall"),": shrinks or expands the file size based on the given input. Expanding the file will add zeroed out bytes"),(0,A.kt)("li",{parentName:"ul"},(0,A.kt)("inlineCode",{parentName:"li"},"lseek syscall"),": moves the marker to given byte offset. You can define offset greater than file size which will expand the file.")))}g.isMDXComponent=!0},7612:function(e,t){t.Z="data:image/png;base64,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"},4877:function(e,t,n){t.Z=n.p+"assets/images/fd-description-b924f6d70e956d92147598b49210a4f7.png"},9578:function(e,t,n){t.Z=n.p+"assets/images/read-sys-275f431ff7e669d81e108ffe6eead94c.png"},8113:function(e,t,n){t.Z=n.p+"assets/images/write-sys-80bc26607ddc670663a28d4ca5fb62dc.png"}}]);