"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    const color = document.querySelector('#color').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message+'&color='+color,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {//response.messagesに今までの投稿がすべて格納されている
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let order_area = document.createElement('span');
                    order_area.className = 'order';
                    order_area.innerText = mes.order;
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    mes_area.style.color = mes.color;
                    let delete_button = document.createElement('button');
                        delete_button.className = 'delete';
                        delete_button.innerText = '削除';
                        delete_button.style.marginLeft = 'auto';
                        delete_button.addEventListener('click', () => {
                            deletePost(mes.order,order_area,name_area,mes_area,mes.color);
                        });

                    cover.appendChild( order_area );
                    cover.appendChild( name_area );//coverの中にname_areaを格納する
                    cover.appendChild(delete_button);
                    cover.appendChild( mes_area );



                    bbs.appendChild( cover );
                }
            })
        }
    });
});



document.querySelector('#search-btn').addEventListener('click', () => {
    const keyword = document.querySelector('#search').value;
    const params = {
        
        method: "POST",
        body: `keyword=${encodeURIComponent(keyword)}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    
    const url = "/searchPosts";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            const matchedIds = response.matchedIds; 
            const covers = document.querySelectorAll('.cover');
            console.log(matchedIds)
            console.log(covers)
            covers.forEach(cover => {
                const order = cover.querySelector('.order').innerText.toLowerCase();
                const orders = Number(order)
                if (matchedIds.includes(orders)) {
                    cover.style.display = ''; // 検索結果に該当する場合表示
                } else {
                    cover.style.display = 'none'; // 該当しない場合非表示
                }
            });
        });
});

document.querySelector('#kaijo').addEventListener('click', () => {
    const covers = document.querySelectorAll('.cover');
    covers.forEach(cover => {
        cover.style.display = '';
    });
});

function deletePost(postId, order,name,message,color) {
    const params = {
        method: "POST",
        body: `id=${encodeURIComponent(postId)}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/sakujo"; 
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            console.log(response.message);
            order.innerHTML= postId
            name.innerHTML=""
            message.innerHTML= ""
        })
        .catch((error) => {
            console.error("削除エラー:", error);
        });
}