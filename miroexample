import React, { useState, useCallback, useRef } from 'react';
import { 
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  Nav
} from 'react-bootstrap';
import ReactFlow, { 
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

const MiroExample = () => {
  // Initial node
  const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Start' },
      position: { x: 250, y: 25 },
    },
  ];

  // States for React Flow
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeName, setNodeName] = useState('');
  const nodeId = useRef(2);

  // Handler for connecting nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handler for adding new nodes
  const addNode = () => {
    if (!nodeName) return;
    
    const newNode = {
      id: nodeId.current.toString(),
      data: { label: nodeName },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 300
      },
      type: 'default'
    };
    
    setNodes((nds) => [...nds, newNode]);
    setNodeName('');
    nodeId.current++;
  };

  // Handler for deleting selected nodes
  const deleteSelectedNodes = () => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => 
      !edge.selected &&
      nodes.find((node) => node.id === edge.source) &&
      nodes.find((node) => node.id === edge.target)
    ));
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h2>Flow Diagram</h2>
      </Card.Header>
      <Card.Body>
        <div style={{ height: '500px' }}>
          <Row className="mb-3">
            <Col sm={8}>
              <Form.Control
                type="text"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                placeholder="Enter node name"
              />
            </Col>
            <Col sm={4} className="d-flex gap-2">
              <Button onClick={addNode}>Add Node</Button>
              <Button variant="danger" onClick={deleteSelectedNodes}>
                Delete Selected
              </Button>
            </Col>
          </Row>
          
          <div style={{ height: '400px', border: '1px solid #ccc' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              deleteKeyCode={['Backspace', 'Delete']}
              multiSelectionKeyCode={['Control', 'Meta']}
              selectionKeyCode={['Shift']}
            >
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MiroExample;
