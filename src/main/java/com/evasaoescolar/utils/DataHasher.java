package com.evasaoescolar.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class DataHasher {

    private static byte[] saltGenerator() {
        SecureRandom randomGenerator = new SecureRandom();
        byte[] salt = new byte[16];
        randomGenerator.nextBytes(salt);
        return salt;
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
