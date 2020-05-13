import styled from 'styled-components';

export const SignUpContainer = styled.div`
display: flex;
flex-direction: column;
width: 380px;

@media screen and (max-width: 800px) {
    width: 100%;
    padding: 10px;
    margin: 50px auto;
    span {
        text-align: center;
    }

}`;

export const TitleText = styled.h1`
margin: 10px 0;
text-align: center`;
