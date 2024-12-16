// fabric.js - biblioteca
const canvas = new fabric.Canvas('canvas', {
    width: 600,
    height: 400,
    backgroundColor: '#f9f9f9',  // cor de fundo inicial
  });
  
  //  adicionar texto ao canvas
  function addText() {
    const text = new fabric.Textbox('Digite o texto aqui', {
      left: 50, // posição inicial
      top: 50,
      fontSize: 30,  // tamanho da fonte
      fontFamily: 'Arial',
      fill: '#000000', // cor do texto
      hasControls: true, // permite redimensionamento e rotação
    });
  
    // adiciona o texto ao canvas
    canvas.add(text);
  
    // foca no objeto de texto adicionado para permitir edição imediatamente
    canvas.setActiveObject(text);
    canvas.renderAll();
  }
  
  // função para adicionar imagem ao canvas
  function addImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (e) {
      fabric.Image.fromURL(e.target.result, function (img) {
        img.set({
          left: 150,
          top: 150,
          angle: 0,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        canvas.add(img);
      });
    };
  
    reader.readAsDataURL(file);
  }
  
  // função para alterar a cor de fundo do canvas
  function changeBackgroundColor() {
    const colors = ['#ff9999', '#99ff99', '#9999ff', '#59BDE9', '#ffcc00'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
    // atualiza a cor de fundo do canvas
    canvas.setBackgroundColor(randomColor, canvas.renderAll.bind(canvas));
  }
  
  // baixar como uma imagem
  function downloadImage() {
    const dataUrl = canvas.toDataURL({ format: 'png' });
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'recado.png';
    link.click();
  }
  
  async function share() {
    const dataUrl = canvas.toDataURL({ format: 'png' });
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], 'recado.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
            files: [file],
            title: 'Seu Recado',
            text: 'Confira o recado que eu criei!',
        })
        .then(() => console.log('Recado compartilhado com sucesso!'))
        .catch((error) => console.error('Erro ao compartilhar:', error));
    } else {
        alert('O compartilhamento de arquivos não é suportado neste navegador.');
    }
}
function clear() {
  if (confirm("Você tem certeza que deseja limpar o canvas?")) {
    canvas.clear(); // Remove todos os objetos do canvas
    canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas)); // Define a cor de fundo como branco
  }
}
