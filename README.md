# introduction
react library to draw sankey diagram 

# installation

`npm i react-sankey-chart`

# Example
<img src ='https://github.com/Salaheldinyoussry/react-sankey-chart/blob/master/example.JPG?raw=true' >


# usage


```js
import Sankey from "react-sankey-chart";

function App() {


    return (
        <div >
            <Sankey graph={
                [
                    {
                        level: 1,    /// specifies which column
                        nodes: [

                            {
                                'id': '1',    
                                "nodeLabel": "Facebook",   
                                "color": 'red',           // will be used in the edges gradient color 
                                'image':'https://img.utdstc.com/icon/fe0/ab6/fe0ab67fa0de2b2681602db5708a076f50dd21106e0c2d38b9661875a37e235e:200',   // icon for the node
                                "edges": [
                                    {
                                        "nodeId": "2",
                                        "edgeWeight": 40
                                    }
                                    , {
                                        "nodeId": "3",
                                        "edgeWeight": 10
                                    }
                                ],
                            },
                        ]
                    },
                    {
                        level: 2,
                        nodes: [

                            {
                                'id': '2',
                                "nodeLabel": "web",
                                "color": 'blue',
                                "edges": [
                                    {
                                        "nodeId": "5",
                                        "edgeWeight": 5
                                    }
                                ],
                            },
                            {
                                'id': '3',
                                "nodeLabel": "any",
                                "color": 'green',
                                "edges": [
                                     {
                                        "nodeId": "4",
                                        "edgeWeight": 20
                                    },
                                    {
                                        "nodeId": "6",
                                        "edgeWeight": 10
                                    }
                                ],
                            },
                        ]
                    },
                    {
                        level: 3,
                        nodes: [

                            {
                                'id': '4',
                                "nodeLabel": "any2",
                                "color": 'yellow',
                                "edges": [
                                ],
                            },

                            {
                                'id': '5',
                                "nodeLabel": "any2",
                                "color": 'yellow',
                                "edges": [
                                ],
                            },

                            {
                                'id': '6',
                                "nodeLabel": "any2",
                                "color": 'yellow',
                                "edges": [
                                ],
                            },
                        ]
                    },
                ]
                    
            } height={400} width={500} />
        </div>
    );
}

export default App;



```
