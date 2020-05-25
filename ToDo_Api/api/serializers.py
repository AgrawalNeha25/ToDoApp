from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.utils import timezone

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=  user)
        return user

class TaskSerializer(serializers.ModelSerializer):
     def validate(self, data):
        if data["start_time"] > data["end_time"]:
            raise serializers.ValidationError({"message": "End time should be greater than start time."})
        if data["start_time"] < timezone.now():
            raise serializers.ValidationError({"message": "Start time should be greater than current time"})
        return data

     class Meta:
        model = Task
        fields = ['id','name','status','start_time','end_time']