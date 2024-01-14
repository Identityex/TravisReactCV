#include "Equipment.h"
#include "Components/PawnNoiseEmitterComponent.h"
#include "Kismet/GameplayStatics.h"
#include "TeStress/TeStressCharacter.h"

UEquipment::UEquipment()
{
	PrimaryComponentTick.bCanEverTick = true;
	PrimaryComponentTick.bStartWithTickEnabled = true;
}

void UEquipment::BeginPlay()
{
	Super::BeginPlay();
}

void UEquipment::PlaySound(AActor* Actor, const EEquipType SoundType) const
{
	switch (SoundType)
	{
	case Equipped:
		if (EquippedSound != nullptr)
		{
			Actor->GetWorld()->GetFirstPlayerController()->ClientPlaySound(EquippedSound);
		}
		break;
	case UnEquipped:
		if (UnEquippedSound != nullptr)
		{
			Actor->GetWorld()->GetFirstPlayerController()->ClientPlaySound(UnEquippedSound);
		}
		break;
	case Toggled:
		if (ToggledSound != nullptr)
		{
			Actor->GetWorld()->GetFirstPlayerController()->ClientPlaySound(ToggledSound);
		}
		break;
	}
}

void UEquipment::PlayAnimation(AActor* Actor, ACharacter* Character, const EEquipType AnimationType)
{
	const USkeletalMeshComponent* CharacterMesh = Character->GetMesh();
	switch (AnimationType)
	{
	case Equipped:
		// Check if the character has a mesh and if the animation is valid and is not already playing an animation
		if (EquippedAnimation != nullptr && CharacterMesh != nullptr && !CharacterMesh->IsPlaying())
		{
			Character->GetMesh()->PlayAnimation(EquippedAnimation, false);
		}
		break;
	case UnEquipped:
		if (UnEquippedAnimation != nullptr && CharacterMesh != nullptr && !CharacterMesh->IsPlaying())
		{
			Character->GetMesh()->PlayAnimation(UnEquippedAnimation, false);
		}
		break;
	case Toggled:
		if (ToggledAnimation != nullptr && CharacterMesh != nullptr && !CharacterMesh->IsPlaying())
		{
			Character->GetMesh()->PlayAnimation(ToggledAnimation, false);
		}
		break;
	}

	EquipToPlayer(Actor, Character);
}

void UEquipment::EquipToPlayer(AActor* Actor, ACharacter* Character)
{
	const FName SocketName = Character->GetComponentByClass<USkeletalMeshComponent>()->GetSocketBoneName(
		"RightHandSocket");
	if (SocketName == NAME_None)
	{
		UE_LOG(LogTemp, Error, TEXT("SocketName is None"));
		return;
	}
	Actor->AttachToComponent(Character->GetComponentByClass<USkeletalMeshComponent>(),
	                         FAttachmentTransformRules::SnapToTargetNotIncludingScale, SocketName);
}

void UEquipment::PlayParticleEffect(AActor* Actor, const EEquipType ParticleType) const
{
	const FVector Location = Actor->GetActorLocation();
	const FRotator Rotation = Actor->GetActorRotation();
	switch (ParticleType)
	{
	case Equipped:
		if (EquippedParticleEffect == nullptr)
		{
			UE_LOG(LogTemp, Error, TEXT("EquippedParticleEffect is nullptr"));
			return;
		}
		UGameplayStatics::SpawnEmitterAtLocation(Actor->GetWorld(), EquippedParticleEffect, Location, Rotation, true);
		break;
	case UnEquipped:
		if (UnEquippedParticleEffect == nullptr)
		{
			UE_LOG(LogTemp, Error, TEXT("UnEquippedParticleEffect is nullptr"));
			return;
		}
		UGameplayStatics::SpawnEmitterAtLocation(Actor->GetWorld(), UnEquippedParticleEffect, Location, Rotation, true);
		break;
	case Toggled:
		if (ToggledParticleEffect == nullptr)
		{
			UE_LOG(LogTemp, Error, TEXT("ToggledParticleEffect is nullptr"));
			return;
		}
		UGameplayStatics::SpawnEmitterAtLocation(Actor->GetWorld(), ToggledParticleEffect, Location, Rotation, true);
		break;
	}
}

void UEquipment::PlayCameraShake(AActor* Actor) const
{
	if (CameraShake == nullptr)
	{
		return;
	}
	Actor->GetWorld()->GetFirstPlayerController()->ClientStartCameraShake(CameraShake);
}

void UEquipment::PlayNoise(AActor* Actor) const
{
	if (NoiseEmitter != nullptr)
	{
		NoiseEmitter->MakeNoise(Actor, 1.0f, Actor->GetActorLocation());
	}
}

void UEquipment::PlayVibration(AActor* Actor)
{
	// Get Player Controller
	APlayerController* PlayerController = Actor->GetWorld()->GetFirstPlayerController();
	if (PlayerController == nullptr)
	{
		UE_LOG(LogTemp, Error, TEXT("PlayerController is nullptr"));
		return;
	}

	PlayerController->PlayDynamicForceFeedback(0.5f, 0.5f, true, true, true, true,
	                                           EDynamicForceFeedbackAction::Start);
}

void UEquipment::PlayAll(AActor* Actor, ACharacter* Character, const EEquipType Type)
{
	PlayAnimation(Actor, Character, Type);
	PlaySound(Actor, Type);
	PlayParticleEffect(Actor, Type);
	PlayCameraShake(Actor);
	PlayNoise(Actor);
	PlayVibration(Actor);
}

void UEquipment::Equip()
{
	// Get Player that is equipping based on the currently equipped item
	ACharacter* Character = GetWorld()->GetFirstPlayerController()->GetCharacter();
	PlayAll(GetOwner(), Character, Equipped);
}

void UEquipment::UnEquip()
{
	// Get Player that is equipping based on the currently equipped item
	ACharacter* Character = GetWorld()->GetFirstPlayerController()->GetCharacter();
	PlayAll(GetOwner(), Character, UnEquipped);
}

void UEquipment::TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);
}
