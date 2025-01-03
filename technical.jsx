import React, { useState, useRef } from 'react';
import { Container, Form, Table, Card, Button } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


const Technical = () => {
  const contentRef = useRef();

  // State definitions
  const [technicalSystems, setTechnicalSystems] = useState([
    { systemName: '', purpose: '', connectedTo: '', teamsUsing: '' }
  ]);
  
  const [technicalExperts, setTechnicalExperts] = useState([
    { system: '', admin: '', configExpert: '', maintenanceOwner: '' }
  ]);
  
  const [integrationPoints, setIntegrationPoints] = useState(['', '']);
  const [limitations, setLimitations] = useState(['', '']);
  const [trainingNeeds, setTrainingNeeds] = useState([
    { team: '', trainingRequired: '', timeline: '' }
  ]);
  const [stakeholders, setStakeholders] = useState([
    { name: '', role: '' }
  ]);
  const [nextSteps, setNextSteps] = useState(['', '']);

  const [checkboxes, setCheckboxes] = useState({
    systemConnections: false,
    apisAvailable: false,
    workflowConfirmed: false,
    adminAccess: false,
    loginDocumented: false,
    securityMet: false
  });

  // PDF generation function
  const generatePDF = async () => {
    const content = contentRef.current;
    try {
      const canvas = await html2canvas(content, {
        scale: 2,
        logging: true,
        letterRendering: true,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('technical-worksheet.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // Event handlers
  const handleCheckboxChange = (event) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked
    });
  };

  const handleSystemChange = (index, field, value) => {
    const newSystems = [...technicalSystems];
    newSystems[index][field] = value;
    setTechnicalSystems(newSystems);
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Technical Systems & Team Readiness Worksheet</h1>
        <Button 
          variant="primary" 
          onClick={generatePDF}
        >
          Download PDF
        </Button>
      </div>

      <div ref={contentRef} className="worksheet-content">
        <Card className="mb-4">
          <Card.Header as="h2">1. Technical Systems</Card.Header>
          <Card.Body>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>System Name</th>
                  <th>Purpose</th>
                  <th>Connected To</th>
                  <th>Teams Using</th>
                </tr>
              </thead>
              <tbody>
                {technicalSystems.map((system, idx) => (
                  <tr key={idx}>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={system.systemName}
                        onChange={(e) => handleSystemChange(idx, 'systemName', e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={system.purpose}
                        onChange={(e) => handleSystemChange(idx, 'purpose', e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={system.connectedTo}
                        onChange={(e) => handleSystemChange(idx, 'connectedTo', e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={system.teamsUsing}
                        onChange={(e) => handleSystemChange(idx, 'teamsUsing', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h5>Key Integration Points:</h5>
            {integrationPoints.map((point, idx) => (
              <Form.Group key={idx}>
                <Form.Control 
                  type="text" 
                  placeholder={`Integration Point ${idx + 1}`}
                  className="mb-2"
                  value={point}
                  onChange={(e) => {
                    const newPoints = [...integrationPoints];
                    newPoints[idx] = e.target.value;
                    setIntegrationPoints(newPoints);
                  }}
                />
              </Form.Group>
            ))}
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header as="h2">2. Technical Experts</Card.Header>
          <Card.Body>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>System</th>
                  <th>Admin</th>
                  <th>Configuration Expert</th>
                  <th>Maintenance Owner</th>
                </tr>
              </thead>
              <tbody>
                {technicalExperts.map((expert, idx) => (
                  <tr key={idx}>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={expert.system}
                        onChange={(e) => {
                          const newExperts = [...technicalExperts];
                          newExperts[idx].system = e.target.value;
                          setTechnicalExperts(newExperts);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={expert.admin}
                        onChange={(e) => {
                          const newExperts = [...technicalExperts];
                          newExperts[idx].admin = e.target.value;
                          setTechnicalExperts(newExperts);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={expert.configExpert}
                        onChange={(e) => {
                          const newExperts = [...technicalExperts];
                          newExperts[idx].configExpert = e.target.value;
                          setTechnicalExperts(newExperts);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={expert.maintenanceOwner}
                        onChange={(e) => {
                          const newExperts = [...technicalExperts];
                          newExperts[idx].maintenanceOwner = e.target.value;
                          setTechnicalExperts(newExperts);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header as="h2">3. Technical Readiness</Card.Header>
          <Card.Body>
            <h5>System Connections:</h5>
            <Form.Group>
              <Form.Check 
                type="checkbox"
                label="Each system connection documented"
                name="systemConnections"
                checked={checkboxes.systemConnections}
                onChange={handleCheckboxChange}
              />
              <Form.Check 
                type="checkbox"
                label="APIs available and documented"
                name="apisAvailable"
                checked={checkboxes.apisAvailable}
                onChange={handleCheckboxChange}
              />
              <Form.Check 
                type="checkbox"
                label="Data and work flow confirmed"
                name="workflowConfirmed"
                checked={checkboxes.workflowConfirmed}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <h5 className="mt-3">Known Limitations & Workarounds:</h5>
            {limitations.map((limitation, idx) => (
              <Form.Group key={idx}>
                <Form.Control 
                  type="text" 
                  placeholder={`Limitation ${idx + 1}`}
                  className="mb-2"
                  value={limitation}
                  onChange={(e) => {
                    const newLimitations = [...limitations];
                    newLimitations[idx] = e.target.value;
                    setLimitations(newLimitations);
                  }}
                />
              </Form.Group>
            ))}
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header as="h2">4. Team Preparation</Card.Header>
          <Card.Body>
            <h5>Training Needs:</h5>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Training Required</th>
                  <th>Timeline</th>
                </tr>
              </thead>
              <tbody>
                {trainingNeeds.map((training, idx) => (
                  <tr key={idx}>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={training.team}
                        onChange={(e) => {
                          const newTraining = [...trainingNeeds];
                          newTraining[idx].team = e.target.value;
                          setTrainingNeeds(newTraining);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={training.trainingRequired}
                        onChange={(e) => {
                          const newTraining = [...trainingNeeds];
                          newTraining[idx].trainingRequired = e.target.value;
                          setTrainingNeeds(newTraining);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={training.timeline}
                        onChange={(e) => {
                          const newTraining = [...trainingNeeds];
                          newTraining[idx].timeline = e.target.value;
                          setTrainingNeeds(newTraining);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h5 className="mt-3">Next Steps:</h5>
            {nextSteps.map((step, idx) => (
              <Form.Group key={idx}>
                <Form.Control 
                  type="text" 
                  placeholder={`Step ${idx + 1}`}
                  className="mb-2"
                  value={step}
                  onChange={(e) => {
                    const newSteps = [...nextSteps];
                    newSteps[idx] = e.target.value;
                    setNextSteps(newSteps);
                  }}
                />
              </Form.Group>
            ))}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Technical;
