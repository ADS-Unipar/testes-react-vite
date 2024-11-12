// Importações necessárias
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, beforeEach, expect, vi } from 'vitest'; // Importações do Vitest
import Card from './Card'; // Substitua pelo caminho correto do seu componente

describe('Card', () => {
  const mockFunction1 = vi.fn();
  const mockFunction2 = vi.fn();
  const title = 'Título do Card';
  const text = 'Este é o texto do card';
  const imageUrl = 'https://via.placeholder.com/150';
  const button1Text = 'Ação 1';
  const button2Text = 'Ação 2';

  beforeEach(() => {
    mockFunction1.mockClear();
    mockFunction2.mockClear();
  });

  it('deve renderizar o título corretamente', () => {
    render(<Card onAction1={mockFunction1} onAction2={mockFunction2} title={title} text={text} imageUrl={imageUrl} button1Text={button1Text} button2Text={button2Text} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('deve renderizar o texto corretamente', () => {
    render(<Card onAction1={mockFunction1} onAction2={mockFunction2} title={title} text={text} imageUrl={imageUrl} button1Text={button1Text} button2Text={button2Text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('deve renderizar a imagem com a URL correta', () => {
    render(<Card onAction1={mockFunction1} onAction2={mockFunction2} title={title} text={text} imageUrl={imageUrl} button1Text={button1Text} button2Text={button2Text} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', imageUrl);
  });

  it('deve chamar a função onAction1 ao clicar no primeiro botão', () => {
    render(<Card onAction1={mockFunction1} onAction2={mockFunction2} title={title} text={text} imageUrl={imageUrl} button1Text={button1Text} button2Text={button2Text} />);
    const button1 = screen.getByText(button1Text);
    fireEvent.click(button1);
    expect(mockFunction1).toHaveBeenCalled();
  });

  it('deve chamar a função onAction2 ao clicar no segundo botão', () => {
    render(<Card onAction1={mockFunction1} onAction2={mockFunction2} title={title} text={text} imageUrl={imageUrl} button1Text={button1Text} button2Text={button2Text} />);
    const button2 = screen.getByText(button2Text);
    fireEvent.click(button2);
    expect(mockFunction2).toHaveBeenCalled();
  });

  it('deve exibir os botões com os textos corretos', () => {
    render(<Card onAction1={mockFunction1} onAction2={mockFunction2} title={title} text={text} imageUrl={imageUrl} button1Text={button1Text} button2Text={button2Text} />);
    expect(screen.getByText(button1Text)).toBeInTheDocument();
    expect(screen.getByText(button2Text)).toBeInTheDocument();
  });

  it('não deve exibir uma imagem se a URL não for fornecida', () => {
    render(<Card onAction1={mockFunction1} onAction2={mockFunction2} title={title} text={text} button1Text={button1Text} button2Text={button2Text} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('deve renderizar os botões e interagir corretamente', () => {
    render(<Card onAction1={mockFunction1} onAction2={mockFunction2} title={title} text={text} imageUrl={imageUrl} button1Text={button1Text} button2Text={button2Text} />);
    const button1 = screen.getByText(button1Text);
    const button2 = screen.getByText(button2Text);
    fireEvent.click(button1);
    fireEvent.click(button2);
    expect(mockFunction1).toHaveBeenCalledTimes(1);
    expect(mockFunction2).toHaveBeenCalledTimes(1);
  });

  // Teste de snapshot
  it('deve corresponder ao snapshot', () => {
    const { asFragment } = render(<Card onAction1={mockFunction1} onAction2={mockFunction2} title={title} text={text} imageUrl={imageUrl} button1Text={button1Text} button2Text={button2Text} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Não deve apresentar o texto caso ele não seja passado', () => {
    render(<Card onAction1={mockFunction1} onAction2={mockFunction2} title={title} imageUrl={imageUrl} button1Text={button1Text} button2Text={button2Text} />);
    expect(screen.queryByTestId('text')).not.toBeInTheDocument();
  });

  it('Não deve renderizar o botão1 caso o texto button1Text não esteja nas propriedades ', () => {
    render(<Card onAction1={mockFunction1} onAction2={mockFunction2} title={title} text={text} imageUrl={imageUrl}  button2Text={button2Text} />);
    expect(screen.queryByRole('button', {description: button1Text})).not.toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(1);
  });

  it('Não deve renderizar o botão1 caso a função onAction1 não esteja nas propriedades ', () => { 
    render(<Card onAction2={mockFunction2} title={title} text={text} imageUrl={imageUrl} button1Text={button1Text} button2Text={button2Text} />);
    expect(screen.queryByRole('button', {description: button1Text})).not.toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(1);
  });

});
