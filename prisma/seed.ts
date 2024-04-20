import { prisma } from '../src/data_base_conection/connect';



async function seed(){
    await prisma.event.create({
        data:{
            id: '9ebd979-9d10-4915-b339-3786b1634f33',
            title: 'Global Service Corporations',
            slug: 'Lançamento_StartUp',
            detail: 'Um evento para novos empreendedores para a area de Tecnologia e Inovação',
            maximumAttendees: 1500,
        },

    })

}

seed().then(() => {
    console.log(" Data Bases Seedded!")
    prisma.$disconnect() // Para desconectar do BD assim que parar de executar
})