import styled from 'styled-components';

export const SignInContainer = styled.div`
width: 380px;
display: flex;
flex-direction: column;

@media screen and (max-width:800px) {
    width: 100%;
    padding: 10px;
    h2, span {
        text-align: center;
    }
}` ;

export const ButtonContainer = styled.div`
display: flex;
justify-content: space-between;`;
