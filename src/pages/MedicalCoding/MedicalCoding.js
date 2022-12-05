import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Container, Input, Row, CardTitle, Button } from "reactstrap";

import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/material_blue.css";
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { useSelector, useDispatch } from "react-redux"
import { getICD10Codes as onGetICD10Codes } from "../../store/medicalcoding/actions"

import Taggy from 'react-taggy'

const MedicalCoding = () => {
  document.title = "Medical Coding"

  const dispatch = useDispatch()
  const { codes } = useSelector(state => ({
    codes: state.codes.codes,
  }))

  const [rawInput, setRawInput] = useState("");

  function handleSubmit() {
    dispatch(onGetICD10Codes(rawInput))
  }

//   useEffect(() => {
//     dispatch(onGetICD10Codes("abc"))
//   }, [dispatch])

  const [taggyArr, setTaggyArr] = useState([]);

  useEffect(() => {
    setTaggyArr([])
    let tempTaggyArr = []

    if(codes.codes){
        Object.keys(codes.codes).forEach(function(key){
            tempTaggyArr.push(
                {
                    "start": codes.codes[key].start_loc - 1, 
                    "end":codes.codes[key].end_loc, 
                    "type":"code"
                })
        })
    }
    setTaggyArr(tempTaggyArr)
  }, [codes])

  const ents = [
    {type: 'code', color: {r: 166, g: 226, b: 45}}
  ]

  function getCodesFromResponse(data) {
    let response_arr = []
    Object.keys(data.codes).forEach(function(key) {
        response_arr.push(key + " "+ data.codes[key].text)
    });

    return response_arr
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Medical Coding" breadcrumbItem="Autonomous ICD-10 and CPT codes" />

          <Row>
              <Card>
                <CardBody>
                <Row>
                  <h4 className="card-title">Enter your patient chart</h4>
                  <div className="mt-3">
                    <Input
                      type="textarea"
                      id="textarea"
                      onChange={e => {setRawInput(e.target.value)}}
                      rows="5"
                      placeholder=""
                    /> 
                  </div>
                  </Row>
                  <Row><p></p></Row>
                  <Row className="justify-content-center">
                    <Col lg={2}>
                    <Button
                        color="success"
                        className="inner"
                        onClick={() => { handleSubmit() }}
                    >
                    Submit
                    </Button>
                    </Col>
                    </Row>
                </CardBody>
              </Card>
            
            </Row>
          <Row>

            
          {codes.length != 0 &&
            <Col xl="6">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Tagged Ouput</CardTitle>
                  <div className="card-coding-output">
                    {/* <Taggy text={codes.input_text} spans={taggyArr} ents={ents} /> */}
                    <p>{codes.input_text}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            }
            
            {codes.length != 0 && 
            <Col xl="6">
              <Card>
                <CardBody>
                  <CardTitle className="h4">ICD 10 and CPT Codes</CardTitle> 
                  <p className="card-coding-output">
                    {codes.length == 0 ? "": getCodesFromResponse(codes).map((d) => <li key={d}>{d}</li>)}
                  </p>
                  
                </CardBody>
              </Card>
            </Col>
            }           
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default MedicalCoding;
