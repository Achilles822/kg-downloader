(function () {

    let download = document.getElementById('download');
    var urlUid;
    var num = 0;
    var more_flag = 1;
    var index = 1;
    var musicSrc = [];
    download.onclick = function () {
        urlUid = document.getElementById('uid').value;
        // console.log(uid);
        // console.log(uid.length);
        if (urlUid.length == 18) {
            fun();
        }
        else {
            swal(
                'uid错误',
                '请输入正确的uid',
                'warning'
            )
        }

    }
    function MusicJsonCallback(data) {
        for (i = 0; i < data.data.ugclist.length; i++) {
            var url = "http://node.kg.qq.com/cgi/fcgi-bin/fcg_get_play_url?shareid=" + data.data.ugclist[i].shareid;
            var p = document.createElement('p'); //创建p节点
            p.innerHTML = (num + 1) + ": " + data.data.ugclist[i].title; //p节点显示的文字
            var audio = document.createElement('audio'); //生成一个audio元素 
            var container = document.getElementById('test');
            var a = document.createElement('a');
            var table = document.getElementById('song-list');
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            audio.controls = true; //这样控件才能显示出来 
            audio.src = url; //音乐的路径 
            audio.preload = "none";
            musicSrc.push({
                url: url,
                title: data.data.ugclist[i].title
            });
            // a.innerText = `右键另存为：${data.data.ugclist[i].title}`;
            a.innerText = "右键另存为";
            a.href = url;
            a.download = data.data.ugclist[i].title;
            a.id = `a${num}`;
            a.className = 'link';
            td1.appendChild(p); //把p添加到页面中
            td2.appendChild(audio); //把audio添加到页面中
            td3.appendChild(a);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            // console.log(table)
            table.appendChild(tr);
            num++;
        }
    }
    var fun = function () {
        let that = this;
        if (more_flag == 1) {
            var src = "https://node.kg.qq.com/cgi/fcgi-bin/kg_ugc_get_homepage?type=get_ugc&start=" + index + "&num=8&share_uid=" + urlUid;
            $.ajax({
                type: "GET",
                url: src,
                dataType: "jsonp", //指定服务器返回的数据类型
                jsonpCallback: "MusicJsonCallback", //指定回调函数名称
                beforeSend: function (request) {
                    request.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36");
                }
            }).done(function (data) {
                MusicJsonCallback(data)
                more_flag = data.data.has_more;
                index++;
                fun();
            }).fail(function () {
                console.log("error");
            })
        } else {
            // console.log(num);
            swal({
                title: '解析完毕?',
                text: "确定下载全部歌曲吗？",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: 'rgb(253, 108, 108)',
                confirmButtonText: '下载全部歌曲',
                cancelButtonText: '取消'
            }).then((result) => {
                if (result.value) {
                    swal(
                        '恭喜',
                        '歌曲开始批量下载，请耐心等待。',
                        'success'
                    )
                    axios.post('/download', {
                        params: {
                            items: musicSrc
                        }
                    }).then(res => {
                        console.log(res.data);
                    })
                }
            })
            // alert('列表获取完毕，开始下载');
            // console.log(musicSrc);
        }
    }
}())