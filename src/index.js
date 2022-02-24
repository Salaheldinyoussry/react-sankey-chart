import React, { useEffect, useState, useRef} from "react";
import './CJ.css'
import Xarrow from "react-xarrows";
import SankeyNode from "./SankeyNode"
import $ from 'jquery'
function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function Sankey({ graph, height , width}) {
    const randomInt= (max, min) => Math.round(Math.random() * (max - min)) + min;

    const [draw, setDraw] = useState(false);

    const forceUpdate = useForceUpdate();

    
    $(window).resize(function () {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 500);
    });

    //redraw graph when window resize is completed  
    $(window).on('resizeEnd', function () {
        forceUpdate();
    });


    const graphHEIGHT = 500;
    let nodeSize = 40
    let nodesMap = {}
    let edges = []
    let nodesColorMap = {}

    const edgeMaxWidth = nodeSize -5
    const edgeMinWidth = 5

   
    let maxEdgeApi = 0
    let minEdgeApi = 99999999999999999

    const mapRange = (input, input_start, input_end, output_start, output_end )=>{
        let slope = (output_end - output_start) / (input_end - input_start)
        let output = output_start + slope * (input - input_start)
        return output
    }

    graph && graph.map(level => {
        level.nodes && level.nodes.map(node => {
            nodesColorMap[node.id] = node.color
            node.edges && node.edges.map(edge => {
                edges.push({ u: node.id, v: edge.nodeId, w: edge.edgeWeight, breakPoint: `${randomInt(10,90)}%` }  )
                minEdgeApi = Math.min(minEdgeApi,edge.edgeWeight)
                maxEdgeApi = Math.max(maxEdgeApi, edge.edgeWeight)

            })
        })
    })
    edges.forEach(e=>{
        e.w = mapRange(e.w, minEdgeApi, maxEdgeApi,edgeMinWidth ,edgeMaxWidth)
        e.sColor = nodesColorMap[e.u]
        e.eColor = nodesColorMap [e.v]
    })


    
   const  rref = useRef(null)

    const finish = useRef(null)
    let styles = {
        height:'40px', width:'40px',
    borderRadius: '10%',
    border: '1px solid #707070',
        boxShadow: 'rgb(149 157 165 / 20%) 0px 8px 24px',
        display: 'flex',
        justifyContent: 'center',
        padding: '2px'
    }

    useEffect(() => {
        setDraw(true)

    }, [rref])


    return (
        <>
            {edges && edges.map(e=>{
               return <>
                <svg style={{ height: 0, width: 0, flex: 0, display: 'list-item'}} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id={`g${e.u}_${e.v}`} x1="0.133" y1="0.008" x2="0.949" y2="1.101" gradientUnits="objectBoundingBox">
                               <stop offset="10%" stop-color={e.sColor} stop-opacity="0.3" />
                               <stop offset="90%" stop-color={e.eColor} stop-opacity="0.3"/>
                        </linearGradient>
                    </defs>
                </svg>

                <svg style={{ height: 0, width: 0, flex: 0, display: 'list-item'}}>
                       <use fill={`url(#g${e.u}_${e.v})`} />
                </svg>
                </>
            })
            }

      
               
        <div ref={rref} id='cj-box-all' style={{ display: 'flex', justifyContent: 'space-between', height: height ? height : '100%', width: width ? width:'120%' ,padding:'10px' }}>
                        {
                            graph && graph.map(level => {
                                return <div className="cj-level">
                                    {level.nodes && level.nodes.map(node => <SankeyNode  title={node.nodeLabel} image={node.image} id={node.id} color='red' styles={styles}  />)}
                                </div>
                            })
                        }

                        {draw?
                               <div ref={finish}>

                                  {edges && edges.map(e=>{
                              
                                  return <Xarrow
                                      SVGcanvasProps={{id:`${e.u}_${e.v}`}}
                                      start={e.u} //can be react ref
                                      end={e.v} //or an id
                                      strokeWidth={e.w}
                                     // path='grid'
                                      startAnchor='right'
                                      endAnchor='left'
                                      //gridBreak = {e.breakPoint}
                                    //   curveness={0.6}
                                      showHead={false}
                                      showTail={false}
                                     // animateDrawing={true}
                                      color={`url(#g${e.u}_${e.v})`}


                                  />  
                                  
                                })
                                }
                                 </div> 
        
                :null}
                    </div>
        

     </>
    );
}

export default Sankey;
