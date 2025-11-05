import React, { useEffect } from 'react';

const PostSidenav = (props) =>{
        useEffect(() => {
            let sidenav = document.getElementsByClassName("sidenav")[0];
        
            if (sidenav.children.length < props.sdnv.length+4)
            for(let i=0; i<props.sdnv.length; i++){
                let nav = document.createElement('a');
                nav.href=props.sdnv[i].href;
        
                let innerA
                if(i===0){
                innerA = document.createElement("img");
                innerA.src=props.sdnv[i].src;
                innerA.alt="icon_picture";
                }
                else {
                    innerA = document.createElement("p");
                    innerA.innerHTML=props.sdnv[i].text;
                }
                nav.appendChild(innerA);
        
                sidenav.appendChild(nav) ;
                console.log(sidenav);
            }
            
            });
            return (
                <></>
            )
}

export default PostSidenav