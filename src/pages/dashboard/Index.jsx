import {Col, Row} from "reactstrap";
import Laoyut from "../../components/layout/Index";
import ListPhotos from "../../components/photo/ListPhotos";
export  default function Dashboard() 
{
  return (
    <Laoyut>
        <Row>
            <Col md={12}>
            <ListPhotos />
            </Col>
        </Row>
    </Laoyut>
  );
  
}
