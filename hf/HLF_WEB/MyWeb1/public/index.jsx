const {Component}=React;
const {Router,Route,IndexRoute,Link}=ReactRouter;
 
class Main extends Component{
    render(){
        return(
            <div>
                <h1>Hyperledger Fabric Study</h1>
                <ul className="header">
                    <li><Link exact to="/">Home</Link></li>
                    <li><Link to="/basic">BasicNetwork</Link></li>
                    <li><Link to="/fabcar">FabCar</Link></li>

                </ul>
                
                <div className="content"></div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
 
class Home extends Component{
    render(){
        return(
            <div>
                <h2>Home</h2>
            </div>
        );
    }
}
class BasicNetwork extends Component{
    state={
        a_amount:0
    }
    state={
        b_amount:0
    }
 
    basic_network_connect=()=>{
        axios.get('basic_network/connect')
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
 
    query=()=>{        
        axios.get('/basic_network/query')
        .then((response)=>{
             this.setState({a_amount:response.data.a_amount,b_amount:response.data.b_amount});
        })
        .catch((error)=>{
            console.log(error);
        });
    }
 
    send=()=>{
        alert(this.amount.value);
        axios.post('/basic_network/send',{"amount":this.amount.value})
        .then((response)=>{
            console.log(response);
            
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    send2=()=>{
        alert(this.amount2.value);
        axios.post('/basic_network/send2',{"amount":this.amount2.value})
        .then((response)=>{
            console.log(response);
            
        })
        .catch((error)=>{
            console.log(error);
        });
    }
 
    render(){
        return(
            <div>
                <h2>BasicNetwork
                ??? <button onClick={this.basic_network_connect}>??????</button></h2>
                <br/>
                <button onClick={this.query}  > ?????? ??????</button> {' '} a : {this.state.a_amount}??? {'    '} b : {this.state.b_amount}??? {'    '}
                <br/>               
                <br/> 
                <div>a??? b?????? {' '}
                <input placeholder='?????????' ref={ref=>this.amount=ref} />?????? {' '} 
                <button onClick={this.send}  > ?????????</button><br/>               
                </div>
                <div>b??? a?????? {' '}
                <input placeholder='?????????' ref={ref=>this.amount2=ref} />?????? {' '} 
                <button onClick={this.send2}  > ?????????</button><br/>               
                </div>
 
            </div>
        );
    }
}
class Fabcar extends Component{  
    state={
        allCars:null
    }
    createCar=()=>{
        const data={
            'carno':this.carno.value,
            'maker':this.maker.value,
            'model':this.model.value,
            'color':this.color.value,
            'owner':this.owner.value
        }
        alert(JSON.stringify(data));

        axios.post('/fabcar/createCar',data)
        .then((res)=>{
            alert(res.data.msg);
            console.log(res.data.msg);
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    wallet=()=>{
        alert("^^");

        axios.get('/fabcar/wallet')
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    queryAllCars=()=>{
        alert("^____^");

        axios.get('/fabcar/queryAllCars')
        .then((res)=>{
            console.log(res.data.msg);
            this.setState({
                allCars:res.data.msg
            });
        })
        .catch((err)=>{
            console.log(err);
        });
    }
 
    render(){
        return(
            <div>
                <h2>fabcar</h2> 
                <br/>
                <button onClick={this.wallet}>?????? ??????</button>
                <hr/>
                <br/>
                CARNO <input ref={ref=>this.carno=ref}/><br/>
                MAKER <input ref={ref=>this.maker=ref}/><br/>
                MODEL <input ref={ref=>this.model=ref}/><br/>
                COLOR <input ref={ref=>this.color=ref}/><br/>
                OWNER <input ref={ref=>this.owner=ref}/><br/>
                <button onClick={this.createCar}>????????? ????????????</button>
                <hr/>
                <button onClick={this.queryAllCars}>?????? ????????? ??????</button>
                <br/>
                <div>{this.state.allCars}</div>
            </div>
        );
    }
}

class FirstNetwork extends Component{
    render(){
        return(
            <div>
                <h2>FirstNetwork</h2>
            </div>
        );
    }
}
 
ReactDOM.render(
    (<Router>
        <Route path="/" component={Main} >
            <IndexRoute component={Home} />
            <Route path="basic" component={BasicNetwork} />
            <Route path="first" component={FirstNetwork} />
            <Route path="fabcar" component={Fabcar} />
        </Route>
    </Router>)
     , document.getElementById("root")
);