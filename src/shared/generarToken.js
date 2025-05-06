// Importar módulos necesarios
const logger = require('../utils/logger'); // Logger personalizado para registrar eventos
const jwt = require('jsonwebtoken'); // Librería para generar y verificar tokens JWT
const config = require('../config/config'); // Configuración personalizada del proyecto

/**
 * @file Utilidad para generar tokens JWT.
 * Este módulo gestiona la generación de tokens JWT utilizando una clave secreta
 * y opciones configurables. También carga las variables de entorno necesarias
 * para la configuración del entorno.
 * 
 * @module generarToken
 */

// Validar que la clave secreta esté configurada
if (!config.jwtSecret) {
    logger.error('❌ La clave secreta JWT no está configurada en el archivo .env');
    throw new Error('La clave secreta JWT no está configurada.');
}

/**
 * Genera un token JWT.
 * 
 * @function generarToken
 * @param {Object} payload - Los datos que se incluirán en el token.
 * @param {string} [secret=config.jwtSecret] - La clave secreta para firmar el token.
 * @param {Object} [options] - Opciones adicionales para el token (opcional).
 * @returns {string} El token JWT generado.
 * 
 */
function generarToken(payload, secret = config.jwtSecret, options = {}) {
    try {
        const token = jwt.sign(payload, secret, options);
        logger.info('🔑 Token JWT generado exitosamente.');
        return token;
    } catch (error) {
        logger.error('❌ Error al generar el token JWT:', error);
        throw error;
    }
}

// Ejemplo de uso: Generar un token con datos de ejemplo
const payload = {
    username: 'admin', // Usuario de ejemplo
};
const options = {
    expiresIn: config.jwtExpiration, // El token expirará en 1 hora
};

logger.info('🔑 Generando token de ejemplo...');

// Generar el token de ejemplo
try {
    const token = generarToken(payload, config.jwtSecret, options);
    logger.info(`🔒 Token generado de forma segura: ${token}`);
} catch (error) {
    logger.error('❌ Error al generar el token de ejemplo:', error.message);
}

/**
 * Exporta la función `generarToken` para ser utilizada en otros módulos.
 * 
 * Este módulo permite generar tokens JWT de manera sencilla y reutilizable
 * en cualquier parte del proyecto.
 * 
 * @exports generarToken
 */
module.exports = {
    generarToken,
};