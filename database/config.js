const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN)
    // await mongoose.connect('mongodb+srv://sysdba:toor@calendardb.gaum6pd.mongodb.net/mern-calendar')
    console.log('DB Online')

  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar la BD')
  }
}

module.exports = {
  dbConnection
}
