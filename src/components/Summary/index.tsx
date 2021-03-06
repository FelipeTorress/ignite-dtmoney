import { Container } from "./styles";

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from "../../hooks/useTransactions";

export function Summary(){
    const {transactions} = useTransactions()

    // const totalDeposits = transactions.reduce((sum, transaction) =>{
    //     if(transaction.type === 'deposit'){
    //         return sum + transaction.amount;
    //     }

    //     return sum;
    // }, 0);//zero valor inicial de sum

    const summary = transactions.reduce((sum, transaction) =>{
        if(transaction.type === 'deposit'){
            sum.deposits += transaction.amount;
            sum.total += transaction.amount;
        }else{
            sum.withdraws += transaction.amount;
            sum.total -= transaction.amount;
        }
        return sum;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    });//zero valor inicial de sum

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)}    
                </strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>-
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)}    
                </strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)}    
                </strong>
            </div>
        </Container>
    );
}