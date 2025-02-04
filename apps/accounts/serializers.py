from rest_framework import serializers

from apps.accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password1",
            "password2",
        )

    def validate(self, attrs):
        password1 = attrs["password1"]
        password2 = attrs["password2"]
        if password1 != password2:
            raise serializers.ValidationError("Two Passwords Didnt Match!")
        return super().validate(attrs)

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password1"])
        user.save()
        return user
