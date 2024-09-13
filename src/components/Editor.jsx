import { useState } from 'react';
import { Box, styled } from '@mui/material';
import { CloseFullscreen } from '@mui/icons-material';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';

const Heading = styled(Box)`
    background: #1d1e22;
    display: flex;
    padding: 9px 12px;
    align-items: center;
`;

const Container = styled(Box)`
    flex-grow: ${props => (props.open ? 1 : 0)};
    flex-basis: 0;
    display: flex;
    flex-direction: column;
    padding: 0 8px 8px;
    overflow: hidden;
    transition: flex-grow 0.3s ease;  
`;

const Header = styled(Box)`
    display: flex;
    background: #060606;
    color: #AAAEBC;
    justify-content: space-between;
    font-weight: 700;
    align-items: center;
`;

const Editor = ({ heading, icon, color, value, onChange }) => {
    const [open, setOpen] = useState(true);

    const handleChange = (editor, data, value) => {
        if (typeof onChange === 'function') {
            onChange(value);
        } else {
            console.error('onChange prop is not a function');
        }
    };

    return (
        <Container open={open}>
            <Header>
                <Heading>
                    <Box
                        component="span"
                        style={{
                            background: color,
                            height: 20,
                            width: 20,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            marginRight: 5,
                            paddingBottom: 2,
                            color: '#000'
                        }}
                    >
                        {icon}
                    </Box>
                    {heading}
                </Heading>
                <CloseFullscreen
                    fontSize="small"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpen(prevState => !prevState)}
                />
            </Header>
            <ControlledEditor
                className='ControlledEditor'
                value={value}
                onBeforeChange={handleChange}
                options={{
                    theme: 'material',
                    lineNumbers: true
                }}
            />
        </Container>
    );
};

export default Editor;
