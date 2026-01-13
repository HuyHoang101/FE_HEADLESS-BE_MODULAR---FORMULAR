export const formatJob = (j) => ({
    id: j.id,
    title: j.title,
    companyId: j.companyId,
    company: { name: j.companyName, logo: j.companyLogo },
    skills: j.tags || [],
    perks: j.benefits || [],
    salary: `${j.salaryMin} - ${j.salaryMax}`,
    location: j.location,
    type: j.employmentType,
    createAt: j.createdAt,
    updatedAt: j.updatedAt
});