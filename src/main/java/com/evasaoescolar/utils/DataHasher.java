package com.evasaoescolar.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class DataHasher {

    public static byte[] saltGenerator() {
        SecureRandom randomGenerator = new SecureRandom();
        byte[] salt = new byte[16];

        for (int i = 0; i < salt.length; i++) {
            salt[i] = (byte) ((byte) randomGenerator.nextInt(95) + 32);
        }

        return salt;
    }

    public static String saltToString(byte[] salt) {
        StringBuilder saltString = new StringBuilder();

        for (byte saltByte: salt) {
            saltString.append((char) (saltByte & 0xFF));
        }

        return saltString.toString();
    }

    public static byte[] saltToBytes (String salt) {
        byte[] saltBytes = new byte[salt.length()];

        for (int i = 0; i < salt.length(); i++) {
            saltBytes[i] = ((byte) salt.charAt(i));
        }
        
        return saltBytes;
    }

    public static String stringToHashString(String originalString, byte[] salt) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        digest.update(salt);
        byte[] encodedHash = digest.digest(originalString.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder(encodedHash.length * 2);

        for (byte hash : encodedHash) {
            String hex = Integer.toHexString(0xff & hash);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }

        return hexString.toString();
    }
}
