const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    let usuario = await User.findOne({ email });
    if (usuario) return res.status(400).json({ msg: 'El usuario ya existe' });

    usuario = new User({ nombre, email, password, rol });
    await usuario.save();

    res.status(201).json({ msg: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error de servidor', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const validPassword = await usuario.compararPassword(password);
    if (!validPassword) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const payload = { id: usuario._id, rol: usuario.rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ token, usuario: { nombre: usuario.nombre, email: usuario.email, rol: usuario.rol } });
  } catch (error) {
    res.status(500).json({ msg: 'Error de servidor', error });
  }
};
