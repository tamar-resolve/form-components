import React, { useState, useRef } from 'react';
import { 
  Container,
  Card,
  Form,
  Row,
  Col,
  Table,
  Button,
  ButtonGroup
} from 'react-bootstrap';
import CanvasDraw from 'react-canvas-draw';

const ProcessMapping = () => {
  const [processData, setProcessData] = useState({
    trigger: {
      description: '',
      types: {
        systemAlert: false,
        userRequest: false,
        scheduledTime: false,
        other: false,
        otherDescription: ''
      }
    },
    steps: ['', '', '', '', ''],
    decisions: [
      { stepNum: '', decision: '', ifYes: '', ifNo: '' },
      { stepNum: '', decision: '', ifYes: '', ifNo: '' }
    ],
    systemInteractions: [
      { stepNum: '', systemTool: '', userAction: '', systemAction: '' },
      { stepNum: '', systemTool: '', userAction: '', systemAction: '' },
      { stepNum: '', systemTool: '', userAction: '', systemAction: '' }
    ],
    dataRequirements: {
      inputs: ['', ''],
      outputs: ['', ''],
      nextSteps: ['', '']
    }
  });

  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushRadius, setBrushRadius] = useState(2);

  const handleTriggerChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProcessData(prev => ({
      ...prev,
      trigger: {
        ...prev.trigger,
        [type === 'checkbox' ? 'types' : 'description']: type === 'checkbox' 
          ? { ...prev.trigger.types, [name]: checked }
          : value
      }
    }));
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...processData.steps];
    newSteps[index] = value;
    setProcessData(prev => ({ ...prev, steps: newSteps }));
  };

  const handleDecisionChange = (index, field, value) => {
    const newDecisions = [...processData.decisions];
    newDecisions[index] = { ...newDecisions[index], [field]: value };
    setProcessData(prev => ({ ...prev, decisions: newDecisions }));
  };

  const handleSystemInteractionChange = (index, field, value) => {
    const newInteractions = [...processData.systemInteractions];
    newInteractions[index] = { ...newInteractions[index], [field]: value };
    setProcessData(prev => ({ ...prev, systemInteractions: newInteractions }));
  };

  const handleDataRequirementChange = (type, index, value) => {
    setProcessData(prev => ({
      ...prev,
      dataRequirements: {
        ...prev.dataRequirements,
        [type]: prev.dataRequirements[type].map((item, i) => 
          i === index ? value : item
        )
      }
    }));
  };

  const handleClearCanvas = () => {
    canvasRef.current.clear();
  };

  const handleUndoCanvas = () => {
    canvasRef.current.undo();
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Process Mapping Worksheet</h1>

      {/* Sketch Area Section */}
      <Card className="mb-4">
        <Card.Header>
          <h2>Process Sketch</h2>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Brush Color</Form.Label>
                <Form.Control
                  type="color"
                  value={brushColor}
                  onChange={(e) => setBrushColor(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Brush Size</Form.Label>
                <Form.Range
                  min="1"
                  max="10"
                  value={brushRadius}
                  onChange={(e) => setBrushRadius(parseInt(e.target.value))}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="position-relative" style={{ border: '1px solid #ccc', background: '#fff' }}>
            <CanvasDraw
              ref={canvasRef}
              brushColor={brushColor}
              brushRadius={brushRadius}
              lazyRadius={0}
              canvasWidth={800}
              canvasHeight={400}
              hideGrid={true}
              className="w-100"
            />
          </div>
          <ButtonGroup className="mt-3">
            <Button variant="secondary" onClick={handleUndoCanvas}>
              Undo
            </Button>
            <Button variant="danger" onClick={handleClearCanvas}>
              Clear Sketch
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>

      {/* Process Trigger Section */}
      <Card className="mb-4">
        <Card.Header>
          <h2>1. Process Trigger</h2>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>This process starts when:</Form.Label>
              <Form.Control
                type="text"
                value={processData.trigger.description}
                onChange={handleTriggerChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Triggered by:</Form.Label>
              {[
                ['systemAlert', 'System alert/notification'],
                ['userRequest', 'User request'],
                ['scheduledTime', 'Scheduled time'],
                ['other', 'Other']
              ].map(([key, label]) => (
                <Form.Check
                  key={key}
                  type="checkbox"
                  id={key}
                  name={key}
                  label={label}
                  checked={processData.trigger.types[key]}
                  onChange={handleTriggerChange}
                  className="mb-2"
                />
              ))}
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      {/* Process Steps Section */}
      <Card className="mb-4">
        <Card.Header>
          <h2>2. Process Steps</h2>
        </Card.Header>
        <Card.Body>
          <Form>
            {processData.steps.map((step, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Label>{index + 1}.</Form.Label>
                <Form.Control
                  type="text"
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  placeholder="Enter process step"
                />
              </Form.Group>
            ))}
          </Form>
        </Card.Body>
      </Card>

      {/* Decision Points Section */}
      <Card className="mb-4">
        <Card.Header>
          <h2>3. Decision Points</h2>
        </Card.Header>
        <Card.Body>
          {processData.decisions.map((decision, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Row className="mb-3">
                  <Col sm={2}>
                    <Form.Group>
                      <Form.Label>Step #</Form.Label>
                      <Form.Control
                        type="text"
                        value={decision.stepNum}
                        onChange={(e) => handleDecisionChange(index, 'stepNum', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Decision:</Form.Label>
                      <Form.Control
                        type="text"
                        value={decision.decision}
                        onChange={(e) => handleDecisionChange(index, 'decision', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-2">
                      <Form.Label>If Yes →</Form.Label>
                      <Form.Control
                        type="text"
                        value={decision.ifYes}
                        onChange={(e) => handleDecisionChange(index, 'ifYes', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>If No →</Form.Label>
                      <Form.Control
                        type="text"
                        value={decision.ifNo}
                        onChange={(e) => handleDecisionChange(index, 'ifNo', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>

      {/* System Interactions Section */}
      <Card className="mb-4">
        <Card.Header>
          <h2>4. System Interactions</h2>
        </Card.Header>
        <Card.Body>
          <Table responsive bordered>
            <thead>
              <tr>
                <th>Step #</th>
                <th>System/Tool</th>
                <th>User Action</th>
                <th>System Action</th>
              </tr>
            </thead>
            <tbody>
              {processData.systemInteractions.map((interaction, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      type="text"
                      value={interaction.stepNum}
                      onChange={(e) => handleSystemInteractionChange(index, 'stepNum', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={interaction.systemTool}
                      onChange={(e) => handleSystemInteractionChange(index, 'systemTool', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={interaction.userAction}
                      onChange={(e) => handleSystemInteractionChange(index, 'userAction', e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={interaction.systemAction}
                      onChange={(e) => handleSystemInteractionChange(index, 'systemAction', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Data Requirements Section */}
      <Card className="mb-4">
        <Card.Header>
          <h2>5. Data Requirements</h2>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label><h5>Input Data Needed:</h5></Form.Label>
              {processData.dataRequirements.inputs.map((input, index) => (
                <Row key={index} className="mb-2">
                  <Col>
                    <Form.Label>{index + 1}.</Form.Label>
                    <Form.Control
                      type="text"
                      value={input}
                      onChange={(e) => handleDataRequirementChange('inputs', index, e.target.value)}
                    />
                  </Col>
                </Row>
              ))}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label><h5>Output Data Produced:</h5></Form.Label>
              {processData.dataRequirements.outputs.map((output, index) => (
                <Row key={index} className="mb-2">
                  <Col>
                    <Form.Label>{index + 1}.</Form.Label>
                    <Form.Control
                      type="text"
                      value={output}
                      onChange={(e) => handleDataRequirementChange('outputs', index, e.target.value)}
                    />
                  </Col>
                </Row>
              ))}
            </Form.Group>

            <Form.Group>
              <Form.Label><h5>Next Steps:</h5></Form.Label>
              {processData.dataRequirements.nextSteps.map((step, index) => (
                <Row key={index} className="mb-2">
                  <Col>
                    <Form.Label>{index + 1}.</Form.Label>
                    <Form.Control
                      type="text"
                      value={step}
                      onChange={(e) => handleDataRequirementChange('nextSteps', index, e.target.value)}
                    />
                  </Col>
                </Row>
              ))}
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProcessMapping;
